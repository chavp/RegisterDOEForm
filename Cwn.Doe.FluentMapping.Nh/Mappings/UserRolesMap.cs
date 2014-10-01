using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UserRolesMap
        : ClassMap<UserRoles>
    {
        public UserRolesMap()
        {
            Table("PRP_USER_ONLINE_ROLE");

            CompositeId()
                .KeyReference(x => x.User, "U_ONLINE_SEQ")
                .KeyReference(x => x.Role, "U_ONLINE_ROLE_SEQ");

            Map(t => t.CreateDate, "CREATE_DATE");
            Map(t => t.CreateBY, "CREATE_BY");
            Version(t => t.LastUpdate).Column("LAST_UPDATE");
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY");
            Map(t => t.IPAddress, "IP_ADDRESS");
        }
    }
}
