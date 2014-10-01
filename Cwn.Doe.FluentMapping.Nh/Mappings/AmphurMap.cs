using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class AmphurMap
        : ClassMap<Amphur>
    {
        public AmphurMap()
        {
            Table("MST_AMPHUR");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.ProvinceCode, "PROVINCE_CODE").Length(5).Not.Nullable();

            Map(t => t.AmphurCode, "AMPHUR_CODE").Length(5).Unique().Not.Nullable();
            Map(t => t.AmphurName, "AMPHUR_NAME").Length(100).Unique().Not.Nullable();

            Map(t => t.ZipCode, "ZIPCODE").Length(5).Not.Nullable();
        }
    }
}
