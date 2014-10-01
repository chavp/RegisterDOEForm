using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class UserRole
    {
        public UserRole()
        {
            Users = new List<User>();
        }

        public virtual long Seq { get; protected set; }

        public virtual string RoleName { get; set; }
        public virtual string RoleDesc { get; set; }

        public virtual DateTime? CreateDate { get; set; }
        public virtual string CreateBY { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual string LastUpdateBY { get; set; }
        public virtual string IPAddress { get; set; }

        public virtual IList<User> Users { get; protected set; }
    }
}
