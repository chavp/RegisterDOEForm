using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class EmployerMap
        : ClassMap<Employer>
    {
        public EmployerMap()
        {
            Table("MST_EMPLOYER");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.EMID, "EM_ID").Unique().Not.Nullable();

            Map(t => t.EMIDFlg, "EM_ID_FLG");
            Map(t => t.EMTName, "EM_TNAME");
            Map(t => t.EMName, "EM_NAME");
            Map(t => t.EMMName, "EM_MNAME");
            Map(t => t.EMSName, "EM_SNAME");
            Map(t => t.EMHouse, "EM_HOUSE");
            Map(t => t.EMMoo, "EM_MOO");
            Map(t => t.EMBuilding, "EM_BUILDING");
            Map(t => t.EMSoi, "EM_SOI");
            Map(t => t.EMRoad, "EM_ROAD");

            Map(t => t.EMVillange, "EM_VILLAGE");
            Map(t => t.EMTamb, "EM_TAMB");
            Map(t => t.EMAmp, "EM_AMP");
            Map(t => t.EMProv, "EM_PROV");
            Map(t => t.EMPost, "EM_POST");
            Map(t => t.EMTel, "EM_TEL");
            Map(t => t.EMFax, "EM_FAX");
            Map(t => t.EMMobile, "EM_MOBILE");
            Map(t => t.EMVersionNO, "EM_VERSION_NO");

            Map(t => t.CreateDate, "CREATE_DATE").Not.Nullable();
            Map(t => t.CreateBY, "CREATE_BY").Not.Nullable();
            Map(t => t.LastUpdate, "LAST_UPDATE").Not.Nullable();
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY").Not.Nullable();
        }
    }
}
