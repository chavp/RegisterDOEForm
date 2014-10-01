using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class WPTypeMap
        : ClassMap<WPType>
    {
        public WPTypeMap()
        {
            Table("MST_WP_TYPE");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.Type, "WP_TYPE").Not.Nullable();
            Map(t => t.TypeName, "WP_TYPE_NAME").Not.Nullable();
            Map(t => t.TypeReason, "WP_TYPE_REASON").Not.Nullable();
            Map(t => t.ActiveFlag, "ACTIVE_FLAG").Not.Nullable();
        }
    }
}
