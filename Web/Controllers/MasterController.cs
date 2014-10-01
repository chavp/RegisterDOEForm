using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DoeWeb.Controllers
{
    using NHibernate;
    using NHibernate.Linq;
    using FluentNHibernate.Cfg;
    using FluentNHibernate.Cfg.Db;
    using Cwn.Doe.BusinessModels.Entities;
    using Cwn.Doe.FluentMapping.Mappings;
    using DoeWeb.Models;
    using WebMatrix.WebData;

    public class MasterController : BaseController
    {
        User _User = null;
        public User CurrentUser(ISession session)
        {
            if (_User == null)
            {
                _User = (from u in session.Query<User>()
                         where u.UserName == WebSecurity.CurrentUserName
                        select u).Single();
            }
            return _User;
        }

        [HttpGet]
        public JsonResult ReadNationality(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<NationalityView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Nation>()
                           select new NationalityView
                           {
                               Seq = n.Seq,
                               NationEN = n.NationEN,
                               NationTH = n.NationTH,
                               NationCode = n.NationCode,
                           }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadCountry(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<CountryView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Country>()
                            select new CountryView
                            {
                                Seq = n.Seq,
                                CountryEN = n.CountryEN,
                                CountryTH = n.CountryTH,
                                CountryAbv = n.CountryAbv
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadProvince(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<ProvinceView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Province>()
                            select new ProvinceView
                            {
                                Seq = n.Seq,
                                ProvinceCode = n.ProvinceCode,
                                ProvinceName = n.ProvinceName
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadAmphur(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<AmphurView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Amphur>()
                            select new AmphurView
                            {
                                Seq = n.Seq,
                                ProvinceCode = n.ProvinceCode,
                                AmphurCode = n.AmphurCode,
                                AmphurName = n.AmphurName
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadTambol(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<TambolView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Tambol>()
                            select new TambolView
                            {
                                Seq = n.Seq,
                                ProvinceCode = n.ProvinceCode,
                                AmphurCode = n.AmphurCode,

                                TamCode = n.TamCode,
                                TamName = n.TamName,
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetPostCode(string provinceCode, string amphurCode, string tamCode)
        {
            string postCode = string.Empty;

            using (var session = _sessionFactory.OpenSession())
            {
                postCode = (from p in session.Query<Post>()
                           where p.ProvinceCode == provinceCode
                           && p.AmphurCode == amphurCode
                           && p.TambolCode == tamCode
                           select p.PostCode).FirstOrDefault();
            }

            var result = new
            {
                postCode = postCode,
                success = true,
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadVisatype(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<VisatypeView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Visatype>()
                            select new VisatypeView
                            {
                                Seq = n.Seq,
                                Typevisa = n.Typevisa,
                                TypevisaTH = n.TypevisaTH,
                                TypevisaAbv = n.TypevisaAbv
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadOccupation(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<OccupationView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Occupation>()
                            select new OccupationView
                            {
                                Seq = n.Seq,
                                OccupationName = n.OccupationName,
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadBUCategory(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<BUCategoryView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<BUCategory>()
                            orderby n.BUOrder
                            select new BUCategoryView
                            {
                                Seq = n.Seq,
                                BUCategoryCode = n.BUCategoryCode,
                                BUCategoryName = n.BUCategoryName,
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ReadBUType(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<BUTypeView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<BUType>()
                            select new BUTypeView
                            {
                                Seq = n.Seq,
                                BUCategoryCode = n.BUCategoryCode,
                                BUTypeCode = n.BUTypeCode,
                                BUTypeName = n.BUTypeName,
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult FindEmployer(int start, int limit, string sort,
            string emName, string query = "")
        {
            var viewList = new List<EmployerView>();

            int count = 0;

            query = query.Trim();
            using (var session = _sessionFactory.OpenSession())
            {

                var user = CurrentUser(session);

                //var q = (from n in session.Query<Employer>()
                //         orderby n.EMName
                //         where n.EMName.Contains(query)
                //         || n.EMTName.Contains(query)
                //         || n.EMID.Contains(query)
                //         select n);

                //if (!string.IsNullOrEmpty(emName))
                //{
                //    q = q.Where(n => n.EMName.Contains(emName));
                //}

                count = user.Employers.Count();
                //var data = q.Skip(start).Take(limit).ToList();

                user.Employers.OrderBy(e => e.EMName).ForEach(n =>
                {
                    viewList.Add(new EmployerView
                            {
                                Seq = n.Seq,
                                EMVersionNO = n.EMVersionNO,
                                EMID = n.EMID.Trim(),
                                //EMIDFlg = n.EMIDFlg,
                                EMName = n.EMName,
                                EMTName = n.EMTName,
                                //EMMName = n.EMMName,
                                EMSName = n.EMSName,
                                //EMHouse = n.EMHouse,
                                //EMMoo = n.EMMoo,
                                //EMBuilding = n.EMBuilding,
                                //EMSoi = n.EMSoi,
                                //EMRoad = n.EMRoad,
                                //EMVillange = n.EMVillange,
                                //EMTamb = n.EMTamb,
                                //EMAmp = n.EMAmp,
                                //EMProv = n.EMProv,
                                //EMPost = n.EMPost,
                                //EMTel = n.EMTel,
                                //EMFax = n.EMFax,
                                //EMMobile = n.EMMobile,
                            });
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

        [HttpGet]
        public JsonResult FindMasterEmployer(int start, int limit, string sort,
            string emName, string query = "")
        {
            var viewList = new List<EmployerView>();

            int count = 0;

            query = query.Trim();
            using (var session = _sessionFactory.OpenSession())
            {
                var user = CurrentUser(session);

                var q = (from n in session.Query<Employer>()
                         orderby n.EMName
                         where !user.Employers.Contains(n)
                         && (n.EMName.Contains(query)
                         || n.EMTName.Contains(query)
                         || n.EMID.Contains(query)) 
                         select n);

                if (!string.IsNullOrEmpty(emName))
                {
                    q = q.Where(n => n.EMName.Contains(emName) || n.EMID.Contains(emName));
                }

                count = q.Count();
                var data = q.Skip(start).Take(limit).ToList();

                data.ForEach(n =>
                {

                    viewList.Add(new EmployerView
                    {
                        Seq = n.Seq,
                        EMVersionNO = n.EMVersionNO,
                        EMID = n.EMID.Trim(),
                        //EMIDFlg = n.EMIDFlg,
                        EMName = n.EMName,
                        EMTName = n.EMTName,
                        //EMMName = n.EMMName,
                        EMSName = n.EMSName,
                        //EMHouse = n.EMHouse,
                        //EMMoo = n.EMMoo,
                        //EMBuilding = n.EMBuilding,
                        //EMSoi = n.EMSoi,
                        //EMRoad = n.EMRoad,
                        //EMVillange = n.EMVillange,
                        //EMTamb = n.EMTamb,
                        //EMAmp = n.EMAmp,
                        //EMProv = n.EMProv,
                        //EMPost = n.EMPost,
                        //EMTel = n.EMTel,
                        //EMFax = n.EMFax,
                        //EMMobile = n.EMMobile,
                    });
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


        [HttpGet]
        public JsonResult GetEmployer(string emid, int version = 0)
        {
            EmployerView empView = new EmployerView();

            using (var session = _sessionFactory.OpenSession())
            {
                var employer = (from e in session.Query<Employer>()
                            where e.EMID == emid
                            select e).FirstOrDefault();

                if (employer != null)
                {
                    empView.Seq = employer.Seq;
                    empView.EMVersionNO = employer.EMVersionNO;
                    empView.EMID = employer.EMID;
                    empView.EMIDFlg = employer.EMIDFlg;
                    empView.EMName = employer.EMName;
                    empView.EMTName = employer.EMTName;
                    empView.EMMName = employer.EMMName;
                    empView.EMSName = employer.EMSName;
                    empView.EMHouse = employer.EMHouse;
                    empView.EMMoo = employer.EMMoo;
                    empView.EMBuilding = employer.EMBuilding;
                    empView.EMSoi = employer.EMSoi;
                    empView.EMRoad = employer.EMRoad;
                    empView.EMVillange = employer.EMVillange;
                    empView.EMTamb = employer.EMTamb;
                    empView.EMAmp = employer.EMAmp;
                    empView.EMProv = employer.EMProv;
                    empView.EMPost = employer.EMPost;
                    empView.EMTel = employer.EMTel;
                    empView.EMFax = employer.EMFax;
                    empView.EMMobile = employer.EMMobile;
  
                    var province = (from n in session.Query<Province>()
                                    where n.ProvinceCode == employer.EMProv
                                    select n).FirstOrDefault();
                    if (province != null)
                    {
                        empView.EMProvName = province.ProvinceName;
                        var amphur = (from n in session.Query<Amphur>()
                                      where n.ProvinceCode == employer.EMProv
                                      && n.AmphurCode == employer.EMAmp
                                      select n
                            ).FirstOrDefault();
                        if (amphur != null)
                        {
                            empView.EMAmpName = amphur.AmphurName;
                            var tambol = (from n in session.Query<Tambol>()
                                          where n.ProvinceCode == employer.EMProv
                                          && n.AmphurCode == employer.EMAmp
                                          && n.TamCode == employer.EMTamb
                                          select n
                           ).FirstOrDefault();
                            if (tambol != null)
                            {
                                empView.EMTambName = tambol.TamName;
                            }
                        }
                    }

                    var emWorkplaces = (from n in session.Query<EmployerWorkplace>()
                                        orderby n.Order
                                       where n.EMID == employer.EMID
                                       select n).ToList();

                    int index = 0;
                    emWorkplaces.ForEach(ew =>
                    {
                        ++index;
                        if(index == 1){
                            empView.EWID = ew.EWID;
                            empView.EWVersionNO = ew.EWVersionNO;
                        }
                        else if (index == 2)
                        {
                            empView.EWID2 = ew.EWID;
                            empView.EW2VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 3)
                        {
                            empView.EWID3 = ew.EWID;
                            empView.EW3VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 4)
                        {
                            empView.EWID4 = ew.EWID;
                            empView.EW4VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 5)
                        {
                            empView.EWID5 = ew.EWID;
                            empView.EW5VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 6)
                        {
                            empView.EWID6 = ew.EWID;
                            empView.EW6VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 7)
                        {
                            empView.EWID7 = ew.EWID;
                            empView.EW7VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 8)
                        {
                            empView.EWID8 = ew.EWID;
                            empView.EW8VersionNO = ew.EWVersionNO;
                        }
                        else if (index == 5)
                        {
                            empView.EWID9 = ew.EWID;
                            empView.EW9VersionNO = ew.EWVersionNO;
                        }
                    });
                }
            }

            var result = new
            {
                employer = empView,
                success = true,
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetEmployerWorkplace(int ewid, int version = 0)
        {
            var ewView = new EmployerWorkplaceView();

            using (var session = _sessionFactory.OpenSession())
            {
                var emWorkplace = (from n in session.Query<EmployerWorkplace>()
                                   where n.EWID == ewid
                                   select n).FirstOrDefault();
                if (emWorkplace != null)
                {
                    ewView.EWID = emWorkplace.EWID;
                    ewView.BUTypeCode = emWorkplace.BUTypeCode;
                    ewView.EWLoc = emWorkplace.EWLoc;
                    ewView.EWName = emWorkplace.EWName;
                    ewView.EWHouse = emWorkplace.EWHouse;
                    ewView.EWMoo = emWorkplace.EWMoo;
                    ewView.EWBuilding = emWorkplace.EWBuilding;
                    ewView.EWSoi = emWorkplace.EWSoi;
                    ewView.EWRoad = emWorkplace.EWRoad;
                    ewView.EWVillage = emWorkplace.EWVillage;
                    ewView.EWTamb = emWorkplace.EWTamb;
                    ewView.EWAmp = emWorkplace.EWAmp;
                    ewView.EWProv = emWorkplace.EWProv;
                    ewView.EWPost = emWorkplace.EWPost;
                    ewView.EWTel = emWorkplace.EWTel;
                    ewView.EWFax = emWorkplace.EWFax;
                    ewView.EWMobile = emWorkplace.EWMobile;
                    ewView.EWVersionNO = emWorkplace.EWVersionNO;

                    var province = (from n in session.Query<Province>()
                                where n.ProvinceCode == emWorkplace.EWProv
                                select n).FirstOrDefault();
                    if (province != null)
                    {
                        ewView.EWProvName = province.ProvinceName;
                        var amphur = (from n in session.Query<Amphur>()
                                      where n.ProvinceCode == emWorkplace.EWProv
                                      && n.AmphurCode == emWorkplace.EWAmp
                                      select n
                            ).FirstOrDefault();
                        if (amphur != null)
                        {
                            ewView.EWAmpName = amphur.AmphurName;
                            var tambol = (from n in session.Query<Tambol>()
                                          where n.ProvinceCode == emWorkplace.EWProv
                                          && n.AmphurCode == emWorkplace.EWAmp
                                          && n.TamCode == emWorkplace.EWTamb
                                          select n
                           ).FirstOrDefault();
                            if (tambol != null)
                            {
                                ewView.EWTambName = tambol.TamName;
                            }
                        }
                    }
                }
            }

            var result = new
            {
                employerWorkplace = ewView,
                success = true,
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult BindEmployer(string emid)
        {
             using (var session = _sessionFactory.OpenSession())
             using (var transaction = session.BeginTransaction())
             {
                 var em = (from e in session.Query<Employer>()
                           where e.EMID == emid
                           select e).Single();

                 User currentUser = CurrentUser(session);
                 //currentUser.Employers.Add(em);

                 var newUserEmployers = new UserEmployers(currentUser, em);

                 session.Save(newUserEmployers);
                 transaction.Commit();
                 return Json(new
                 {
                     success = true,
                 }, JsonRequestBehavior.AllowGet);
             }
        }

        [HttpPost]
        public JsonResult UnbindEmployer(string emid)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var em = (from e in session.Query<Employer>()
                          where e.EMID == emid
                          select e).Single();

                User currentUser = CurrentUser(session);
                //currentUser.Employers.Remove(em);

                var removeUserEmployers = (from e in session.Query<UserEmployers>()
                                           where e.User == currentUser
                                           && e.Employer == em
                                           select e).Single();

                session.Delete(removeUserEmployers);
                transaction.Commit();
                return Json(new
                {
                    success = true,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult FindEmployerWorkplace(
            int start, int limit, string sort,
            string emid,
            string query = "")
        {
            var viewList = new List<EmployerWorkplaceView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            using (var tran = session.BeginTransaction())
            {
                var q = from n in session.Query<EmployerWorkplace>()
                        orderby n.Order
                        where n.EMID == emid
                        select n;

                var results = q.ToList();
                int order = 0;
                results.ForEach(r =>
                {
                    ++order;
                    var newR = new EmployerWorkplaceView
                    {
                        Order = r.Order,
                        EMID = emid,
                        EWBuilding = r.EWBuilding,
                        EWHouse = r.EWBuilding,
                        EWID = r.EWID,
                        EWMoo = r.EWMoo,
                        EWPost = r.EWPost,
                        EWSoi = r.EWSoi,
                        EWLoc = r.EWLoc,
                    };
                    viewList.Add(newR);

                    if (r.Order == 0)
                    {
                        r.AssignOrder(order);
                        newR.Order = order;
                    }

                    var province = (from n in session.Query<Province>()
                                    where n.ProvinceCode == r.EWProv
                                    select n).FirstOrDefault();
                    if (province != null)
                    {
                        newR.EWProvName = province.ProvinceName;
                        var amphur = (from n in session.Query<Amphur>()
                                      where n.ProvinceCode == r.EWProv
                                      && n.AmphurCode == r.EWAmp
                                      select n
                            ).FirstOrDefault();
                        if (amphur != null)
                        {
                            newR.EWAmpName = amphur.AmphurName;
                            var tambol = (from n in session.Query<Tambol>()
                                          where n.ProvinceCode == r.EWProv
                                          && n.AmphurCode == r.EWAmp
                                          && n.TamCode == r.EWTamb
                                          select n
                           ).FirstOrDefault();
                            if (tambol != null)
                            {
                                newR.EWTambName = tambol.TamName;
                            }
                        }
                    }
                });

                tran.Commit();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpEmployerWorkplace(int ewid)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var e = (from ew in session.Query<EmployerWorkplace>()
                         where ew.EWID == ewid
                         select ew).Single();

                var downEW = (from ew in session.Query<EmployerWorkplace>()
                              where e.Order - ew.Order == 1
                              && ew.EMID == e.EMID
                              select ew).FirstOrDefault();

                e.UpOrder();
                if (downEW != null)
                {
                    downEW.DownOrder();
                }

                transaction.Commit();
                return Json(new
                {
                    success = true,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DownEmployerWorkplace(int ewid)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var e = (from ew in session.Query<EmployerWorkplace>()
                         where ew.EWID == ewid
                          select ew).Single();

                var upEW = (from ew in session.Query<EmployerWorkplace>()
                            where ew.Order - e.Order == 1
                            && ew.EMID == e.EMID
                            select ew).FirstOrDefault();

                e.DownOrder();
                if (upEW != null)
                {
                    upEW.UpOrder();
                }

                transaction.Commit();
                return Json(new
                {
                    success = true,
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult ReadUnits(int start, int limit, string sort, string query = "")
        {
            var viewList = new List<UnitsView>();

            int count = 0;

            using (var session = _sessionFactory.OpenSession())
            {
                viewList = (from n in session.Query<Units>()
                            select new UnitsView
                            {
                                Code = n.Code,
                                Name = n.Name
                            }).ToList();
            }

            var result = new
            {
                data = viewList,
                total = count,
                success = true,
            };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
