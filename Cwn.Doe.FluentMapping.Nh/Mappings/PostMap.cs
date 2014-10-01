using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class PostMap
        : ClassMap<Post>
    {
        public PostMap()
        {
            Table("MST_POST");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.PostCode, "POST_CODE").Unique().Not.Nullable();

            Map(t => t.TambolCode, "TAMBOL_CODE").Not.Nullable();
            Map(t => t.AmphurCode, "AMPHUR_CODE").Not.Nullable();
            Map(t => t.ProvinceCode, "PROVINCE_CODE").Not.Nullable();
        }
    }
}
