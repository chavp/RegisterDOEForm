using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class EmployerWorkplaceMap
        : ClassMap<EmployerWorkplace>
    {
        public EmployerWorkplaceMap()
        {
            Table("MST_EMPLOYER_WORKPLACE");

            Id(t => t.EWID, "EW_ID").GeneratedBy.Identity();

            Map(t => t.Order, "EW_ORDER");
            Map(t => t.EMID, "EM_ID").Not.Nullable();
            Map(t => t.BUTypeCode, "BU_TYPE_CODE");
            Map(t => t.EWLoc, "EW_LOC");
            Map(t => t.EWName, "EW_NAME");
            Map(t => t.EWHouse, "EW_HOUSE");
            Map(t => t.EWMoo, "EW_MOO");
            Map(t => t.EWBuilding, "EW_BUILDING");
            Map(t => t.EWSoi, "EW_SOI");
            Map(t => t.EWRoad, "EW_ROAD");
            Map(t => t.EWVillage, "EW_VILLAGE");
            Map(t => t.EWTamb, "EW_TAMB");
            Map(t => t.EWAmp, "EW_AMP");
            Map(t => t.EWProv, "EW_PROV");
            Map(t => t.EWPost, "EW_POST");
            Map(t => t.EWTel, "EW_TEL");
            Map(t => t.EWFax, "EW_FAX");
            Map(t => t.EWMobile, "EW_MOBILE");
            Map(t => t.EWVersionNO, "EW_VERSION_NO");
        }
    }
}
