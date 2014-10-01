using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class BUCategoryMap
        : ClassMap<BUCategory>
    {
        public BUCategoryMap()
        {
            Table("MST_BU_CATEGORY");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.BUCategoryCode, "BU_CATEGORY_CODE").Length(10).Unique().Not.Nullable();
            Map(t => t.BUCategoryName, "BU_CATEGORY_NAME").Length(200).Unique().Not.Nullable();
            Map(t => t.BUOrder, "BU_ORDER").Length(4);
        }
    }
}
