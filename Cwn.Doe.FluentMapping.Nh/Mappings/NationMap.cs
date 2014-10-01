using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class NationMap
        : ClassMap<Nation>
    {
        public NationMap()
        {
            Table("MST_NATION");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.NationTH, "NATION_TH").Unique().Not.Nullable();
            Map(t => t.NationEN, "NATION_EN").Unique().Not.Nullable();
            Map(t => t.NationCode, "NATION_CODE").Unique().Not.Nullable();
        }
    }
}
