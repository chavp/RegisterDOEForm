using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class UserEmployers
    {
        protected UserEmployers()
        {
        }

        public UserEmployers(User user, Employer employer)
        {
            User = user;
            Employer = employer;
        }

        public virtual User User { get; protected set; }
        public virtual Employer Employer { get; protected set; }

        public virtual DateTime? CreateDate { get; set; }
        public virtual string CreateBY { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual string LastUpdateBY { get; set; }
        public virtual string IPAddress { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;

            var compare = obj as UserEmployers;

            if (compare == null)
                return false;

            return User.Seq == compare.User.Seq &&
                   Employer.Seq == compare.Employer.Seq;
        }

        public override int GetHashCode()
        {
            return (User.Seq + "|" + Employer.Seq).GetHashCode();
        }
    }
}
