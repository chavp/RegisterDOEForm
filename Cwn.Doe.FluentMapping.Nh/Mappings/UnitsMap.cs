using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UnitsMap
        : ClassMap<Units>
    {
        public UnitsMap()
        {
            Table("MST_UNITS");

            Id(t => t.Code, "UNIT_CODE").GeneratedBy.Assigned();

            Map(t => t.Name, "UNIT_NAME");

        }
    }
}
