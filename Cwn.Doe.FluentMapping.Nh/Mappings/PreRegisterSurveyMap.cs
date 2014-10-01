using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class PreRegisterSurveyMap
        : ClassMap<PreRegisterSurvey>
    {
        public PreRegisterSurveyMap()
        {
            Table("MST_PRE_REGISTER_SURVEY");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            References(t => t.PreRegister, "SEQ_PRE_REGISTER")
                .ForeignKey("FK_MST_PRE_REGISTER_SURVEY_MST_PRE_REGISTER").Unique().Not.Nullable();
            References(t => t.Units, "UNIT_CODE")
                .ForeignKey("FK_MST_PRE_REGISTER_SURVEY_MST_UNITS").Not.Nullable();

            //HasOne(m => m.PreRegister).ForeignKey("SEQ_PRE_REGISTER");
            //HasOne(m => m.Units).ForeignKey("UNIT_CODE");

            Map(t => t.NameContract, "NAME_CONTRACT").Length(200);
            Map(t => t.Tel, "TEL").Length(100);

            Map(t => t.CreateDate, "CREATE_DATE");
            Map(t => t.CreateBY, "CREATE_BY");
            Version(t => t.LastUpdate).Column("LAST_UPDATE");
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY");
            Map(t => t.IPAddress, "IP_ADDRESS");

        }
    }
}
