using DoeWeb.Fillters;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;

namespace DoeWeb.Controllers
{
    [Authorize]
    [ErrorLog]
    [SessionState(SessionStateBehavior.Disabled)]
    public abstract class BaseController : Controller
    {
        protected readonly ISessionFactory _sessionFactory = null;

        public BaseController()
        {
            _sessionFactory = MvcApplication.CreateMSSQLSessionFactory();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (_sessionFactory != null)
            {
                _sessionFactory.Dispose();
            }
        }
    }
}