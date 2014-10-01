
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DoeWeb.Controllers
{
    using AutoMapper;
    using CrystalDecisions.CrystalReports.Engine;
    using Cwn.Doe.BusinessModels.Entities;
    using DoeWeb.Models;
    using NHibernate;
    using NHibernate.Linq;
    using System.Data;
    using System.Globalization;
    using System.IO;
    using WebMatrix.WebData;

    public class MainController : BaseController
    {
        User _User = null;
        public User CurrentUser
        {
            get
            {
                if (_User == null)
                {
                    using (var session = _sessionFactory.OpenSession())
                    {
                        _User = (from u in session.Query<User>()
                                 where u.UserName == WebSecurity.CurrentUserName
                                 select u).Single();
                    }
                }
                return _User;
            }
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid &&
                WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                return Json(new
                {
                    message = "",
                    returnUrl = returnUrl,
                    success = true,
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                message = "กรุณาระบุรหัสพนักงาน หรือรหัสเข้าระบบให้ถูกต้อง",
                success = false,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult LogOff()
        {
            WebSecurity.Logout();

            using (var session = _sessionFactory.OpenSession())
            {
                var user = (from u in session.Query<User>()
                            where u.UserName == WebSecurity.CurrentUserName
                            select u).FirstOrDefault();

                if (user != null)
                {
                    user.LastLockoutIP = HttpContext.Request.UserHostAddress;
                    user.LastLockoutDate = DateTime.Now;
                    user.IsLockedOut = true;

                    session.Flush();
                }
            }

            return RedirectToAction("Index", "Main");
        }

        [HttpGet]
        public JsonResult FindFormWP2(
            int start, int limit, string sort, 
            string emid, string citizenID,
            string aName, string aMName, string aSName, 
            string wpStatus,
            string query = "")
        {
            var viewList = new List<FormWP2View>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                var q = from n in session.Query<WPPreRegister>()
                        orderby n.WPCitizenID
                        where n.CreateBY == CurrentUser.UserName
                        select n;

                if (!string.IsNullOrEmpty(emid))
                {
                    q = q.Where(n => n.EMID == emid);
                }
                if (!string.IsNullOrEmpty(citizenID))
                {
                    q = q.Where(n => n.WPCitizenID == citizenID);
                }
                if (!string.IsNullOrEmpty(aName))
                {
                    q = q.Where(n => n.WPName.Contains(aName) || n.WPMNameEN.Contains(aName));
                }
                if (!string.IsNullOrEmpty(aSName))
                {
                    q = q.Where(n => n.WPSName.Contains(aSName) || n.WPSNameEN.Contains(aSName));
                }
                if (!string.IsNullOrEmpty(aMName))
                {
                    q = q.Where(n => n.WPMName.Contains(aMName) || n.WPMNameEN.Contains(aMName));
                }
                if (wpStatus != "All")
                {
                    q = q.Where(n => n.WPStatus == wpStatus);
                }
                count = q.Count();

                var results = q.Skip(start).Take(limit).ToList();
                results.ForEach( n => {

                    var wp = GetFormWP2View(n, session);

                    viewList.Add(wp);
                });
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        protected FormWP2View GetFormWP2View(WPPreRegister n, ISession session)
        {
            var em = (from e in session.Query<Employer>()
                      where e.EMID == n.EMID
                      select e).FirstOrDefault();

            var nationName = (from e in session.Query<Nation>()
                              where e.NationCode == n.WPNation
                              select e.NationTH).FirstOrDefault();

            var wpCountryAbdTH = (from e in session.Query<Country>()
                                  where e.CountryAbv == n.WPCountryAbd
                                  select e.CountryTH).FirstOrDefault();

            var wpProvName = (from e in session.Query<Province>()
                              where e.ProvinceCode == n.WPProv
                              select e.ProvinceName).FirstOrDefault();

            var wpAmpName = (from e in session.Query<Amphur>()
                             where e.AmphurCode == n.WPAmp
                             select e.AmphurName).FirstOrDefault();

            var wpTambName = (from e in session.Query<Tambol>()
                              where e.TamCode == n.WPTamb
                              select e.TamName).FirstOrDefault();

            var bookIssueProvNDName = (from e in session.Query<Province>()
                                       where e.ProvinceCode == n.BookIssueProvND
                                       select e.ProvinceName).FirstOrDefault();

            var rgWorkTypeName = (from e in session.Query<Occupation>()
                                  where e.Seq.ToString() == n.OccupationSeq
                                  select e.OccupationName).FirstOrDefault();

            string emProvName = string.Empty;
            string emAmpName = string.Empty;
            string emTambName = string.Empty;

            if (em != null)
            {
                emProvName = (from e in session.Query<Province>()
                              where e.ProvinceCode == em.EMProv
                              select e.ProvinceName).FirstOrDefault();
                emAmpName = (from e in session.Query<Amphur>()
                             where e.AmphurCode == em.EMAmp
                             select e.AmphurName).FirstOrDefault();
                emTambName = (from e in session.Query<Tambol>()
                              where e.TamCode == em.EMTamb
                              select e.TamName).FirstOrDefault();
            }

            var ew = (from e in session.Query<EmployerWorkplace>()
                      where e.EWID == n.EWID
                      select e).FirstOrDefault();

            string ewProvName = string.Empty;
            string ewAmpName = string.Empty;
            string ewTambName = string.Empty;
            if (ew != null)
            {
                ewProvName = (from e in session.Query<Province>()
                              where e.ProvinceCode == ew.EWProv
                              select e.ProvinceName).FirstOrDefault();
                ewAmpName = (from e in session.Query<Amphur>()
                             where e.AmphurCode == ew.EWAmp
                             select e.AmphurName).FirstOrDefault();
                ewTambName = (from e in session.Query<Tambol>()
                              where e.TamCode == ew.EWTamb
                              select e.TamName).FirstOrDefault();
            }


            var wp = new FormWP2View(
                n, em, ew,
                nationName,
                wpCountryAbdTH,
                wpProvName, wpAmpName, wpTambName,
                bookIssueProvNDName,
                rgWorkTypeName, rgWorkTypeName,
                emProvName, emAmpName, emTambName,
                ewProvName, ewAmpName, ewTambName);

            return wp;
        }

        [HttpPost]
        public JsonResult SaveFormWP2(FormWP2View model)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var count = (from wp in session.Query<WPPreRegister>()
                            where wp.WPCitizenID == model.CitizenID
                            select wp).Count();

                if (count > 0)
                {
                    return Json(new
                    {
                        success = false,
                        message = "พบ Citizen ID นี้อยู่ในระบบแล้ว",
                    }, JsonRequestBehavior.AllowGet);
                }

                var newWPPreRegister = new WPPreRegister
                {
                    WPCitizenID = model.CitizenID,
                    WPVersionNO = 0,
                    CreateBY = CurrentUser.UserName
                };

                model.DefaultForm();
                model.CopyAllFieldTo(newWPPreRegister);

                newWPPreRegister.UpdateWPStatus();

                session.Save(newWPPreRegister);
                transaction.Commit();
                return Json(new
                {
                    success = true,
                    seq = model.Seq,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpDelete]
        public JsonResult DeleteFormWP2(FormWP2View model)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var oldWPPreRegister = (from n in session.Query<WPPreRegister>()
                               where n.Seq == model.Seq
                               select n).Single();

                session.Delete(oldWPPreRegister);
                transaction.Commit();

                return Json(new
                {
                    success = true,
                    message = "",
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPut]
        public JsonResult UpdateFormWP2(FormWP2View model)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var oldForm = (from wp in session.Query<WPPreRegister>()
                               where wp.Seq == model.Seq
                               select wp).Single();

                if (model.Seq != oldForm.Seq)
                {
                    var duplication = (from wp in session.Query<WPPreRegister>()
                                       where wp.WPCitizenID == model.CitizenID
                                       select wp).ToList();

                    if (duplication.Count > 0)
                    {
                        return Json(new
                        {
                            success = false,
                            message = "พบ Citizen ID นี้อยู่ในระบบแล้ว",
                        }, JsonRequestBehavior.AllowGet);
                    }
                }

                var update = new WPPreRegister();
                model.CopyAllFieldTo(update);

                if (oldForm.IsCompleted && !update.IsCompleted)
                {
                    return Json(new
                    {
                        success = false,
                        message = "กรุณาระบุข้อมูลให้สมบูรณ์",
                    }, JsonRequestBehavior.AllowGet);
                }

                if (!oldForm.IsCompleted && update.IsCompleted)
                {
                    var searchSurvey = (from s in session.Query<PreRegisterSurvey>()
                                       where s.Seq == model.PreRegisterSurveySeq
                                       select s).FirstOrDefault();
                    if (searchSurvey == null)
                    {
                        return Json(new
                        {
                            success = true,
                            survay = true,
                            message = "กรุณากรอกแบบสอบถาม",
                        }, JsonRequestBehavior.AllowGet);
                    }
                }

                var count = (from wp in session.Query<WPPreRegister>()
                             where wp.WPCitizenID == model.CitizenID
                             && wp.WPCitizenID != oldForm.WPCitizenID
                             select wp).Count();

                if (count > 0)
                {
                    return Json(new
                    {
                        success = false,
                        message = "พบ Citizen ID นี้อยู่ในระบบแล้ว",
                    }, JsonRequestBehavior.AllowGet);
                }

                model.CopyAllFieldTo(oldForm);

                oldForm.UpdateWPStatus();

                // save history
                if (oldForm.IsCompleted)
                {
                    // save history
                    var his = Mapper.Map<WPPreRegisterHis>(oldForm);
                    session.Save(his);

                }

                session.Update(oldForm);
                transaction.Commit();
                return Json(new
                {
                    success = true,
                    seq = model.Seq,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public FileResult PrintFormWP2(string barcodeID)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var formWP2 = (from x in session.Query<WPPreRegister>()
                               where x.BarcodeID == barcodeID
                              select x).Single();

                var wp = GetFormWP2View(formWP2, session);

                string fullFilepath = Server.MapPath(@"~\Export\");
                string fullfile_pdf;
                if (!Directory.Exists(fullFilepath))
                {
                    Directory.CreateDirectory(fullFilepath);
                }
                
                using (var crystalReport = new ReportDocument())
                {
                    
                    DataTable dt = GetTable(wp);
                    crystalReport.Load(Server.MapPath("~/Content/Report/rptWPTS.rpt"));
                    crystalReport.SetDataSource(dt);

                    //MemoryStream oStream; // using System.IO
                    //oStream = (MemoryStream)
                    //crystalReport.ExportToStream(
                    //CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                    //Response.Clear();
                    //Response.Buffer = true;
                    //Response.ContentType = "application/pdf";
                    //Response.BinaryWrite(oStream.ToArray());
                    //Response.End();
                    fullfile_pdf = fullFilepath + barcodeID + ".pdf";
                    using (var oStream = (MemoryStream)crystalReport.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat))
                    using (var file = new FileStream(fullfile_pdf, FileMode.Create, FileAccess.Write))
                    {
                        //HttpContext.Current.Response.Clear();
                        //HttpContext.Current.Response.Buffer = true;
                        //HttpContext.Current.Response.ContentType = "application/pdf";
                        //HttpContext.Current.Response.BinaryWrite(oStream.ToArray());
                        //HttpContext.Current.Response.End();
                        oStream.WriteTo(file);
                    }
                }

                return File(fullfile_pdf, "application/pdf");
            }
        }

        private DataTable GetTable()
        {
            // Here we create a DataTable with four columns.
            DataTable table = new DataTable();

            table.Columns.Add("WI_BOOK_FLAG", typeof(string));
            table.Columns.Add("ADDRESS2", typeof(string));
            table.Columns.Add("ADDRESS3", typeof(string));
            table.Columns.Add("ADDRESS4", typeof(string));

            table.Columns.Add("RG_TYPE", typeof(string));
            table.Columns.Add("WI_FLAG", typeof(string));
            table.Columns.Add("WP_PASSPORT_FLAG", typeof(string));

            table.Columns.Add("WP_CITIZEN_ID", typeof(string));

            table.Columns.Add("WP_FULL_NAME", typeof(string));
            table.Columns.Add("WP_NAME_TITLE", typeof(string));
            table.Columns.Add("WP_NATION", typeof(string));
            table.Columns.Add("WP_BDATE", typeof(string));
            table.Columns.Add("WP_AGE", typeof(string));
            table.Columns.Add("WP_BLOOD_GRP", typeof(string));
            table.Columns.Add("WP_SEX", typeof(string));
            table.Columns.Add("WP_ADDR_ABD", typeof(string));
            table.Columns.Add("WP_COUNTRY_ABD", typeof(string));
            table.Columns.Add("WP_PCODE_ABD", typeof(string));
            table.Columns.Add("WP_HOUSE", typeof(string));
            table.Columns.Add("WP_MOO", typeof(string));
            table.Columns.Add("WP_SOI", typeof(string));
            table.Columns.Add("WP_BUILDING", typeof(string));
            table.Columns.Add("WP_ROAD", typeof(string));
            table.Columns.Add("WP_TAMB", typeof(string));
            table.Columns.Add("WP_AMP", typeof(string));
            table.Columns.Add("WP_PROV", typeof(string));
            table.Columns.Add("WP_POST", typeof(string));
            table.Columns.Add("WP_TEL", typeof(string));
            table.Columns.Add("WP_FAX", typeof(string));

            table.Columns.Add("WP_REPRESENT_PASSPORT", typeof(string));
            table.Columns.Add("WP_PASSPORT_NO", typeof(string));
            table.Columns.Add("WP_PASSPORT_ISSUE_AT", typeof(string));
            table.Columns.Add("WP_PASSPORT_COUNTRY", typeof(string));
            table.Columns.Add("WP_PASSPORT_ISSUE_DATE", typeof(string));
            table.Columns.Add("WP_PASSPORT_EXPIRE_DATE", typeof(string));
            table.Columns.Add("WP_VISA_TYPE", typeof(string));
            table.Columns.Add("WP_VISA_NO", typeof(string));
            table.Columns.Add("WP_VISA_ISSUE_AT", typeof(string));
            table.Columns.Add("WP_VISA_ISSUE_DATE", typeof(string));
            table.Columns.Add("WP_VISA_EXPIRE_DATE", typeof(string));
            table.Columns.Add("WP_ARRIVAL_DATE", typeof(string));
            table.Columns.Add("WP_IMMI_CHECKPOINT", typeof(string));
            table.Columns.Add("WP_STAYABLE_DATE", typeof(string));

            table.Columns.Add("WP_ID_ST", typeof(string));
            table.Columns.Add("BOOK_ISSUE_PROV_ST", typeof(string));
            table.Columns.Add("WP_ID_ND", typeof(string));
            table.Columns.Add("BOOK_ISSUE_DATE_ND", typeof(string));
            table.Columns.Add("BOOK_ISSUE_PROV_ND", typeof(string));
            table.Columns.Add("BOOK_EXPIRE_DATE_ND", typeof(string));

            table.Columns.Add("RG_WORK_TYPE", typeof(string));
            table.Columns.Add("RG_WORK_DETAIL", typeof(string));
            table.Columns.Add("RG_OCCUP", typeof(string));
            table.Columns.Add("EM_ID", typeof(string));
            table.Columns.Add("EM_FULLNAME", typeof(string));

            table.Columns.Add("EM_HOUSE", typeof(string));
            table.Columns.Add("EM_MOO", typeof(string));
            table.Columns.Add("EM_BUILDING", typeof(string));
            table.Columns.Add("EM_SOI", typeof(string));
            table.Columns.Add("EM_ROAD", typeof(string));
            table.Columns.Add("EM_TAMB", typeof(string));
            table.Columns.Add("EM_AMP", typeof(string));
            table.Columns.Add("EM_PROV", typeof(string));
            table.Columns.Add("EM_POST", typeof(string));
            table.Columns.Add("EM_TEL", typeof(string));
            table.Columns.Add("EM_FAX", typeof(string));
            table.Columns.Add("EM_MOBILE", typeof(string));
            table.Columns.Add("EW_HOUSE", typeof(string));
            table.Columns.Add("EW_MOO", typeof(string));
            table.Columns.Add("EW_SOI", typeof(string));
            table.Columns.Add("EW_BUILDING", typeof(string));
            table.Columns.Add("EW_ROAD", typeof(string));
            table.Columns.Add("EW_TAMB", typeof(string));
            table.Columns.Add("EW_AMP", typeof(string));
            table.Columns.Add("EW_PROV", typeof(string));
            table.Columns.Add("EW_POST", typeof(string));
            table.Columns.Add("EW_TEL", typeof(string));
            table.Columns.Add("EW_FAX", typeof(string));
            table.Columns.Add("EW_MOBILE", typeof(string));
            table.Columns.Add("BARCODE", typeof(string));
            table.Columns.Add("DISTRICT_NAME", typeof(string));
            table.Columns.Add("WP_VERSION_NO", typeof(string));


            DataRow dr = table.NewRow();

            dr = table.NewRow();

            dr["WI_BOOK_FLAG"] = "Y";
            dr["ADDRESS2"] = "(2) 333 ถ.สีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 โทร.02-656-9899 ต่อ 92 โทรสาร.02-656-9897";
            dr["ADDRESS3"] = "(3) 35 ถ.สุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110 โทร.02-656-9899 ต่อ 92 โทรสาร.02-656-9897";
            dr["ADDRESS4"] = "(4) 1222 ถ.พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120 โทร.02-656-9899 ต่อ 92 โทรสาร.02-656-9897";



            dr["RG_TYPE"] = "N";
            dr["WI_FLAG"] = "Y";
            dr["WP_PASSPORT_FLAG"] = "P";

            dr["WP_CITIZEN_ID"] = "1100800656987";

            dr["WP_FULL_NAME"] = "Abdulra Marakong";
            dr["WP_NAME_TITLE"] = "Mr";
            dr["WP_NATION"] = "Cambodia";
            dr["WP_BDATE"] = "12/12/1985";
            dr["WP_AGE"] = "28";
            dr["WP_BLOOD_GRP"] = "O";
            dr["WP_SEX"] = "Male";
            dr["WP_ADDR_ABD"] = @"100E0 Street 118 PHNOM PENH ";
            dr["WP_COUNTRY_ABD"] = "Cambodia";
            dr["WP_PCODE_ABD"] = "12203";
            dr["WP_HOUSE"] = "548";
            dr["WP_MOO"] = "2";
            dr["WP_SOI"] = "48";
            dr["WP_BUILDING"] = "บ้างบึง";
            dr["WP_ROAD"] = "พระราม 9";
            dr["WP_TAMB"] = "พระราม 9";
            dr["WP_AMP"] = "พระราม 9";
            dr["WP_PROV"] = "กรุงเทพ";
            dr["WP_POST"] = "10500";
            dr["WP_TEL"] = "02-878-9655";
            dr["WP_FAX"] = "02-878-9657";

            dr["WP_REPRESENT_PASSPORT"] = "C.I.";
            dr["WP_PASSPORT_NO"] = "AA1054879";
            dr["WP_PASSPORT_ISSUE_AT"] = "PHNOM PENH";
            dr["WP_PASSPORT_COUNTRY"] = "CAMBODIA";
            dr["WP_PASSPORT_ISSUE_DATE"] = "12 พฤศจิกายน 2557";
            dr["WP_PASSPORT_EXPIRE_DATE"] = "12 พฤศจิกายน 2562";
            dr["WP_VISA_TYPE"] = "";
            dr["WP_VISA_NO"] = "";
            dr["WP_VISA_ISSUE_AT"] = "";
            dr["WP_VISA_ISSUE_DATE"] = "";
            dr["WP_VISA_EXPIRE_DATE"] = "";
            dr["WP_ARRIVAL_DATE"] = "";
            dr["WP_IMMI_CHECKPOINT"] = "";
            dr["WP_STAYABLE_DATE"] = "";

            dr["WP_ID_ST"] = "05605303050";
            dr["BOOK_ISSUE_PROV_ST"] = "กรุงเทพมหานคร";
            dr["WP_ID_ND"] = "05605303050";
            dr["BOOK_ISSUE_DATE_ND"] = "15 มีนาคม 2558";
            dr["BOOK_ISSUE_PROV_ND"] = "กรุงเทพมหานคร";
            dr["BOOK_EXPIRE_DATE_ND"] = "15 มีนาคม 2558";

            dr["RG_WORK_TYPE"] = "ลูกจ้างในครัวเรือนส่วนบุคคล";
            dr["RG_WORK_DETAIL"] = "ทำงานบ้านทั่วไป ดูแลความเป็นอยู่ของหัวหน้างาน";
            dr["RG_OCCUP"] = "พ่อบ้าน";
            dr["EM_ID"] = "01558455985";
            dr["EM_FULLNAME"] = "สหยทธ สาระสุขสิ้น";

            dr["EM_HOUSE"] = "54/88";
            dr["EM_MOO"] = "2";
            dr["EM_BUILDING"] = "";
            dr["EM_SOI"] = "7";
            dr["EM_ROAD"] = "พระราม 2";
            dr["EM_TAMB"] = "ท่าข้าม";
            dr["EM_AMP"] = "บางขุนเทียน";
            dr["EM_PROV"] = "กรุงเทพ";
            dr["EM_POST"] = "10150";
            dr["EM_TEL"] = "02-788-7895";
            dr["EM_FAX"] = "-";
            dr["EM_MOBILE"] = "088-959-6300";
            dr["EW_HOUSE"] = "574";
            dr["EW_MOO"] = "1";
            dr["EW_SOI"] = "10";
            dr["EW_BUILDING"] = "อาคารช้าง";
            dr["EW_ROAD"] = "สีลม";
            dr["EW_TAMB"] = "บางรัก";
            dr["EW_AMP"] = "บางรัก";
            dr["EW_PROV"] = "กรุงเทพ";
            dr["EW_POST"] = "10500";
            dr["EW_TEL"] = "02-989-6963";
            dr["EW_FAX"] = "-";
            dr["EW_MOBILE"] = "089-969-8785";
            dr["BARCODE"] = "1100800656987002";
            dr["DISTRICT_NAME"] = "สำนักงานตรวจคนต่างด้าวภูเก็ต";
            dr["WP_VERSION_NO"] = "2";

            table.Rows.Add(dr);

            return table;
        }
        private DataTable GetTable(FormWP2View model)
        {
            // Here we create a DataTable with four columns.
            DataTable table = new DataTable();

            table.Columns.Add("WI_BOOK_FLAG", typeof(string));
            table.Columns.Add("ADDRESS2", typeof(string));
            table.Columns.Add("ADDRESS3", typeof(string));
            table.Columns.Add("ADDRESS4", typeof(string));

            table.Columns.Add("RG_TYPE", typeof(string));
            table.Columns.Add("WI_FLAG", typeof(string));
            table.Columns.Add("WP_PASSPORT_FLAG", typeof(string));

            table.Columns.Add("WP_CITIZEN_ID", typeof(string));

            table.Columns.Add("WP_FULL_NAME", typeof(string));
            table.Columns.Add("WP_NAME_TITLE", typeof(string));
            table.Columns.Add("WP_NATION", typeof(string));
            table.Columns.Add("WP_BDATE", typeof(string));
            table.Columns.Add("WP_AGE", typeof(string));
            table.Columns.Add("WP_BLOOD_GRP", typeof(string));
            table.Columns.Add("WP_SEX", typeof(string));
            table.Columns.Add("WP_ADDR_ABD", typeof(string));
            table.Columns.Add("WP_COUNTRY_ABD", typeof(string));
            table.Columns.Add("WP_PCODE_ABD", typeof(string));
            table.Columns.Add("WP_HOUSE", typeof(string));
            table.Columns.Add("WP_MOO", typeof(string));
            table.Columns.Add("WP_SOI", typeof(string));
            table.Columns.Add("WP_BUILDING", typeof(string));
            table.Columns.Add("WP_ROAD", typeof(string));
            table.Columns.Add("WP_TAMB", typeof(string));
            table.Columns.Add("WP_AMP", typeof(string));
            table.Columns.Add("WP_PROV", typeof(string));
            table.Columns.Add("WP_POST", typeof(string));
            table.Columns.Add("WP_TEL", typeof(string));
            table.Columns.Add("WP_FAX", typeof(string));

            table.Columns.Add("WP_REPRESENT_PASSPORT", typeof(string));
            table.Columns.Add("WP_PASSPORT_NO", typeof(string));
            table.Columns.Add("WP_PASSPORT_ISSUE_AT", typeof(string));
            table.Columns.Add("WP_PASSPORT_COUNTRY", typeof(string));
            table.Columns.Add("WP_PASSPORT_ISSUE_DATE", typeof(string));
            table.Columns.Add("WP_PASSPORT_EXPIRE_DATE", typeof(string));
            table.Columns.Add("WP_VISA_TYPE", typeof(string));
            table.Columns.Add("WP_VISA_NO", typeof(string));
            table.Columns.Add("WP_VISA_ISSUE_AT", typeof(string));
            table.Columns.Add("WP_VISA_ISSUE_DATE", typeof(string));
            table.Columns.Add("WP_VISA_EXPIRE_DATE", typeof(string));
            table.Columns.Add("WP_ARRIVAL_DATE", typeof(string));
            table.Columns.Add("WP_IMMI_CHECKPOINT", typeof(string));
            table.Columns.Add("WP_STAYABLE_DATE", typeof(string));

            table.Columns.Add("WP_ID_ST", typeof(string));
            table.Columns.Add("BOOK_ISSUE_PROV_ST", typeof(string));
            table.Columns.Add("WP_ID_ND", typeof(string));
            table.Columns.Add("BOOK_ISSUE_DATE_ND", typeof(string));
            table.Columns.Add("BOOK_ISSUE_PROV_ND", typeof(string));
            table.Columns.Add("BOOK_EXPIRE_DATE_ND", typeof(string));

            table.Columns.Add("RG_WORK_TYPE", typeof(string));
            table.Columns.Add("RG_WORK_DETAIL", typeof(string));
            table.Columns.Add("RG_OCCUP", typeof(string));
            table.Columns.Add("EM_ID", typeof(string));
            table.Columns.Add("EM_FULLNAME", typeof(string));

            table.Columns.Add("EM_HOUSE", typeof(string));
            table.Columns.Add("EM_MOO", typeof(string));
            table.Columns.Add("EM_BUILDING", typeof(string));
            table.Columns.Add("EM_SOI", typeof(string));
            table.Columns.Add("EM_ROAD", typeof(string));
            table.Columns.Add("EM_TAMB", typeof(string));
            table.Columns.Add("EM_AMP", typeof(string));
            table.Columns.Add("EM_PROV", typeof(string));
            table.Columns.Add("EM_POST", typeof(string));
            table.Columns.Add("EM_TEL", typeof(string));
            table.Columns.Add("EM_FAX", typeof(string));
            table.Columns.Add("EM_MOBILE", typeof(string));
            table.Columns.Add("EW_HOUSE", typeof(string));
            table.Columns.Add("EW_MOO", typeof(string));
            table.Columns.Add("EW_SOI", typeof(string));
            table.Columns.Add("EW_BUILDING", typeof(string));
            table.Columns.Add("EW_ROAD", typeof(string));
            table.Columns.Add("EW_TAMB", typeof(string));
            table.Columns.Add("EW_AMP", typeof(string));
            table.Columns.Add("EW_PROV", typeof(string));
            table.Columns.Add("EW_POST", typeof(string));
            table.Columns.Add("EW_TEL", typeof(string));
            table.Columns.Add("EW_FAX", typeof(string));
            table.Columns.Add("EW_MOBILE", typeof(string));
            table.Columns.Add("BARCODE", typeof(string));
            table.Columns.Add("DISTRICT_NAME", typeof(string));
            table.Columns.Add("WP_VERSION_NO", typeof(string));


            DataRow dr = table.NewRow();

            dr = table.NewRow();

            dr["WI_BOOK_FLAG"] = model.BookFlag;
            if (model.EWID2.HasValue)
            {
                dr["ADDRESS2"] = "(มีสถานที่ทำงานมากกว่าหนึ่งแห่ง)";
                //dr["ADDRESS3"] = "(3) 35 ถ.สุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110 โทร.02-656-9899 ต่อ 92 โทรสาร.02-656-9897";
                //dr["ADDRESS4"] = "(4) 1222 ถ.พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120 โทร.02-656-9899 ต่อ 92 โทรสาร.02-656-9897";
            }


            dr["RG_TYPE"] = model.RGType;
            dr["WI_FLAG"] = model.WIFlag;
            dr["WP_PASSPORT_FLAG"] = model.WPPassportFlag;

            dr["WP_CITIZEN_ID"] = model.CitizenID;

            dr["WP_FULL_NAME"] = model.AlienFullNameEN;
            var wpTNameEN = string.Empty;
            if (!string.IsNullOrEmpty(model.WPTNameEN))
            {
                wpTNameEN = model.WPTNameEN.Replace(".", "");
            }
            dr["WP_NAME_TITLE"] = wpTNameEN;
            dr["WP_NATION"] = model.WPNationName;
            dr["WP_BDATE"] = model.WPBDate.GetValueOrDefault().ToString("dd/MM/yyyy", new CultureInfo("en-US"));
            dr["WP_AGE"] = model.WPAge;
            dr["WP_BLOOD_GRP"] = model.WPBloodGp;
            dr["WP_SEX"] = model.WPSex;
            dr["WP_ADDR_ABD"] = model.WPAddrAbd;
            dr["WP_COUNTRY_ABD"] = model.WPCountryAbdTH;// country ไทย
            dr["WP_PCODE_ABD"] = model.WPPCodeAbd;
            dr["WP_HOUSE"] = model.WPHouse;
            dr["WP_MOO"] = model.WPMoo;
            dr["WP_SOI"] = model.WPSoi;
            dr["WP_BUILDING"] = model.WPBuilding;
            dr["WP_ROAD"] = model.WPRoad;
            dr["WP_TAMB"] = model.WPTambName;
            dr["WP_AMP"] = model.WPAmpName;
            dr["WP_PROV"] = model.WPProvName;

            dr["WP_POST"] = model.WPPost;
            dr["WP_TEL"] = model.WPTel;
            dr["WP_FAX"] = model.WPFax;

            dr["WP_REPRESENT_PASSPORT"] = "";
            dr["WP_PASSPORT_NO"] = model.WPPassportNO;
            dr["WP_PASSPORT_ISSUE_AT"] = model.WPPassportIssueAT;
            dr["WP_PASSPORT_COUNTRY"] = model.WPPassportCountry;
            dr["WP_PASSPORT_ISSUE_DATE"] = ToLongDateString(model.WPPassportIssueDate);
            dr["WP_PASSPORT_EXPIRE_DATE"] = ToLongDateString(model.WPPassportExpireDate);
            dr["WP_VISA_TYPE"] = model.WPVisaType;
            dr["WP_VISA_NO"] = model.WPVisaNO;
            dr["WP_VISA_ISSUE_AT"] = model.WPVisaIssueAT;
            dr["WP_VISA_ISSUE_DATE"] = ToLongDateString(model.WPVisaIssueDate);
            dr["WP_VISA_EXPIRE_DATE"] = ToLongDateString(model.WPVisaExpireDate);
            dr["WP_ARRIVAL_DATE"] = ToLongDateString(model.WPArrivalDate);
            dr["WP_IMMI_CHECKPOINT"] = model.WPImmiCheckpoint;
            dr["WP_STAYABLE_DATE"] = ToLongDateString(model.WPStayableDate);

            dr["WP_ID_ST"] = model.WPIDST;
            dr["BOOK_ISSUE_PROV_ST"] = model.BookIssueProvST;
            dr["WP_ID_ND"] = model.WPIDND;
            dr["BOOK_ISSUE_DATE_ND"] = ToLongDateString(model.BookIssueDateND);
            dr["BOOK_ISSUE_PROV_ND"] = model.BookIssueProvNDName;
            dr["BOOK_EXPIRE_DATE_ND"] = ToLongDateString(model.BookExpireDateND);

            dr["RG_WORK_TYPE"] = model.RGWorkTypeName;
            dr["RG_WORK_DETAIL"] = model.RGWorkDetail;
            dr["RG_OCCUP"] = model.Occupation; // พ่อบ้าน
            dr["EM_ID"] = model.EMID;
            dr["EM_FULLNAME"] = model.EMFullName;

            dr["EM_HOUSE"] = model.EM_HOUSE;
            dr["EM_MOO"] = model.EM_MOO;
            dr["EM_BUILDING"] = model.EM_BUILDING;
            dr["EM_SOI"] = model.EM_SOI;
            dr["EM_ROAD"] = model.EM_ROAD;
            dr["EM_TAMB"] = model.EM_TAMB_NAME;
            dr["EM_AMP"] = model.EM_AMP_NAME;
            dr["EM_PROV"] = model.EM_PROV_NAME;
            dr["EM_POST"] = model.EM_POST;
            dr["EM_TEL"] = model.EM_TEL;
            dr["EM_FAX"] = model.EM_FAX;
            dr["EM_MOBILE"] = model.EM_MOBILE;

            dr["EW_HOUSE"] = model.EW_HOUSE;
            dr["EW_MOO"] = model.EW_MOO;
            dr["EW_SOI"] = model.EW_SOI;
            dr["EW_BUILDING"] = model.EW_BUILDING;
            dr["EW_ROAD"] = model.EW_ROAD;
            dr["EW_TAMB"] = model.EW_TAMB_NAME;
            dr["EW_AMP"] = model.EW_AMP_NAME;
            dr["EW_PROV"] = model.EW_PROV_NAME;
            dr["EW_POST"] = model.EW_POST;
            dr["EW_TEL"] = model.EW_TEL;
            dr["EW_FAX"] = model.EW_FAX;
            dr["EW_MOBILE"] = model.EW_MOBILE;

            dr["BARCODE"] = model.BarcodeID;
            dr["DISTRICT_NAME"] = model.DistrictCode;
            dr["WP_VERSION_NO"] = model.Version;

            table.Rows.Add(dr);

            return table;
        }

        protected string ToLongDateString(DateTime? date)
        {
            string dateFormat = "";
            string yearEN = date.GetValueOrDefault().ToString("yyyy", new CultureInfo("en-US"));
            string yearLocal = date.GetValueOrDefault().ToString("yyyy");
            dateFormat = date.GetValueOrDefault().ToLongDateString().Replace(yearLocal, yearEN);
            return dateFormat;
        }

        [HttpPost]
        public JsonResult SavePreRegisterSurvey(PreRegisterSurveyView model)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var wpPreRegister = (from x in session.Query<WPPreRegister>()
                                         where x.Seq == model.WPPreRegisterSeq
                                         select x).Single();

                var units = (from x in session.Query<Units>()
                                         where x.Code == model.UnitsCode
                                         select x).Single();

                var newSurvey = new PreRegisterSurvey(wpPreRegister, units)
                {
                    NameContract = model.NameContract,
                    Tel = model.Tel,
                };

                session.Save(newSurvey);
                transaction.Commit();
                return Json(new
                {
                    success = true,
                    seq = newSurvey.Seq,
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
