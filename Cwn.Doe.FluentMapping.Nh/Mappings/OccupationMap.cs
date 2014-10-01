using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class OccupationMap
        : ClassMap<Occupation>
    {
        public OccupationMap()
        {
            Table("MST_OCCUPATION");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.OccupationName, "OCCUPATION").Not.Nullable();
        }
    }
}
