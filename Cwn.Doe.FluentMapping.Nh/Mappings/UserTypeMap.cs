using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UserTypeMap
        : EntityVersionMap<UserType>
    {
        public UserTypeMap()
        {
            Table("MST_USER_ONLINE_TYPE");

            Id(t => t.ID, "U_ONLINE_TYPE_ID").GeneratedBy.Assigned();

            Map(t => t.Name, "U_TYPE_NAME").Length(50).Unique().Not.Nullable();
            Map(t => t.NameEN, "U_TYPE_NAME_EN").Length(50).Unique().Not.Nullable();

        }
    }
}
