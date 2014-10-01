using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class TambolMap
        : ClassMap<Tambol>
    {
        public TambolMap()
        {
            Table("MST_TAMBOL");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.AmphurCode, "AMPHUR_CODE").Not.Nullable();
            Map(t => t.ProvinceCode, "PROVINCE_CODE").Not.Nullable();

            Map(t => t.TamCode, "TAM_CODE").Unique().Not.Nullable();
            Map(t => t.TamName, "TAM_NAME").Unique().Not.Nullable();
        }
    }
}
