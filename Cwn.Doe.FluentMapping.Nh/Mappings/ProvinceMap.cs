using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class ProvinceMap
         : ClassMap<Province>
    {
        public ProvinceMap()
        {
            Table("MST_PROVINCE");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.ProvinceCode, "PROVINCE_CODE").Unique().Not.Nullable();
            Map(t => t.ProvinceName, "PROVINCE_NAME").Unique().Not.Nullable();
        }
    }
}
