using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace DoeWeb.Models.Providers
{
    using Cwn.Doe.BusinessModels.Entities;
    using NHibernate;
    using NHibernate.Linq;
    using NHibernate;
    public class DoeRoleProvider
        : RoleProvider
    {
        ISessionFactory _sessionFactory = null;
        public DoeRoleProvider()
        {
            _sessionFactory = MvcApplication.CreateMSSQLSessionFactory();
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            //throw new NotImplementedException();
            var roles = new List<string>();

            using (var session = _sessionFactory.OpenSession())
            {
                roles = (from r in session.Query<UserRoles>()
                         join u in session.Query<User>() on r.User equals u
                         where u.UserName == username
                         select r.Role.RoleName).ToList();
            }

            return roles.ToArray();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}