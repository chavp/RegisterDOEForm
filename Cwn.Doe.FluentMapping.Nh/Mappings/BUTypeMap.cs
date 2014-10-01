using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class BUTypeMap
        : ClassMap<BUType>
    {
        public BUTypeMap()
        {
            Table("MST_BU_TYPE");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.BUCategoryCode, "BU_CATEGORY_CODE").Length(10).Not.Nullable();

            Map(t => t.BUTypeCode, "BU_TYPE_CODE").Length(10).Unique().Not.Nullable();
            Map(t => t.BUTypeName, "BU_TYPE_NAME").Length(1000).Unique().Not.Nullable();
            Map(t => t.GroupFlag, "GROUP_FLAG").Length(30);
            Map(t => t.ActiveFlag, "ACTIVE_FLAG");
        }
    }
}
