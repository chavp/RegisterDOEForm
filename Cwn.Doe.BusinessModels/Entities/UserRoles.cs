using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class UserRoles
        : EntityVersion
    {
        protected UserRoles()
        {
            CreateDate = DateTime.Now;
            CreateBY = Environment.UserName;
        }

        public UserRoles(User user, UserRole role)
        {
            User = user;
            Role = role;
        }
        public virtual User User { get; protected set; }
        public virtual UserRole Role { get; protected set; }

        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;

            var compare = obj as UserRoles;

            if (compare == null)
                return false;

            return User.Seq == compare.User.Seq &&
                   Role.Seq == compare.Role.Seq;
        }

        public override int GetHashCode()
        {
            return (User.Seq + "|" + Role.Seq).GetHashCode();
        }
    }
}
