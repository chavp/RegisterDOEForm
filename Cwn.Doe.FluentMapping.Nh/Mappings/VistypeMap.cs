using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class VistypeMap
        : ClassMap<Visatype>
    {
        public VistypeMap()
        {
            Table("MST_VISATYPE");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.Typevisa, "TYPEVISA").Not.Nullable();
            Map(t => t.TypevisaTH, "TYPEVISA_TH").Not.Nullable();
            Map(t => t.TypevisaAbv, "TYPEVISA_ABV").Not.Nullable();
        }
    }
}
