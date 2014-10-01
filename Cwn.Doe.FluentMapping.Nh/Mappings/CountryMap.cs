using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class CountryMap
        : ClassMap<Country>
    {
        public CountryMap()
        {
            Table("MST_COUNTRY");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.CountryTH, "COUNTRY_TH").Unique().Not.Nullable();
            Map(t => t.CountryEN, "COUNTRY_EN").Unique().Not.Nullable();
            Map(t => t.CountryAbv, "COUNTRY_ABV").Unique().Not.Nullable();
        }
    }
}
