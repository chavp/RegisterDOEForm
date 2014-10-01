using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.FluentMapping.Mappings
{
    using Cwn.Doe.BusinessModels.Entities;
    using FluentNHibernate.Mapping;

    public class UserMap
        : EntityVersionMap<User>
    {
        public UserMap()
        {
            Table("MST_USER_ONLINE");

            Id(t => t.Seq, "SEQ").GeneratedBy.Identity();

            Map(t => t.UserName, "U_NAME").Length(150).Unique().Not.Nullable();
            Map(t => t.Password, "PWD").Length(200).Not.Nullable();
            Map(t => t.FirstName, "FIRST_NAME").Length(100).Not.Nullable();
            Map(t => t.LastName, "LAST_NAME").Length(100);
            Map(t => t.Email, "EMAIL").Length(150);
            Map(t => t.Tel, "TEL").Length(100);
            Map(t => t.Mobile, "MOBILE").Length(100);

            References(x => x.UserType, "U_ONLINE_TYPE_ID");

            HasManyToMany(x => x.Employers)
                .Table("PRP_USER_ONLINE_EMPLOYER")
                .ParentKeyColumn("MST_USER_ONLINE_SEQ")
                .ChildKeyColumn("MST_EMPLOYER_SEQ");
        }
    }
}
