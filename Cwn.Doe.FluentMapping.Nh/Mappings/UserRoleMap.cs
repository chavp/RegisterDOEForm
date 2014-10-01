using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UserRoleMap
        : ClassMap<UserRole>
    {
        public UserRoleMap()
        {
            Table("MST_USER_ONLINE_ROLE");

            Id(t => t.Seq, "SEQ").UniqueKey("PK_MST_USER_ONLINE_ROLE").GeneratedBy.Identity();

            Map(t => t.RoleName, "U_ROLE_NAME").Length(100).Unique().Not.Nullable();
            Map(t => t.RoleDesc, "U_ROLE_DESC").Length(200);

            Map(t => t.CreateDate, "CREATE_DATE");
            Map(t => t.CreateBY, "CREATE_BY");
            Version(t => t.LastUpdate).Column("LAST_UPDATE");
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY");
            Map(t => t.IPAddress, "IP_ADDRESS");

            HasManyToMany(x => x.Users)
                .Table("PRP_USER_ONLINE_ROLE")
                .ParentKeyColumn("U_ONLINE_SEQ")
                .ChildKeyColumn("U_ONLINE_ROLE_SEQ");

        }
    }
}
