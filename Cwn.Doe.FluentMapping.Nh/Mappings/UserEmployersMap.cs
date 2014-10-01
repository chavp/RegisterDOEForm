using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UserEmployersMap
        : ClassMap<UserEmployers>
    {
        public UserEmployersMap()
        {
            Table("PRP_USER_ONLINE_EMPLOYER");

            CompositeId()
                .KeyReference(x => x.User, "MST_USER_ONLINE_SEQ")
                .KeyReference(x => x.Employer, "MST_EMPLOYER_SEQ");

            Map(t => t.CreateDate, "CREATE_DATE");
            Map(t => t.CreateBY, "CREATE_BY");
            Version(t => t.LastUpdate).Column("LAST_UPDATE");
            Map(t => t.LastUpdateBY, "LAST_UPDATE_BY");
            Map(t => t.IPAddress, "IP_ADDRESS");
        }
    }
}
