using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public abstract class EntityVersion
    {
        protected EntityVersion()
        {
            CreateDate = DateTime.Now;
        }

        public virtual DateTime CreateDate { get; protected set; }
        public virtual string CreateBY { get; set; }
        public virtual DateTime? LastUpdate { get; set; }
        public virtual string LastUpdateBY { get; set; }
        public virtual string IPAddress { get; set; }
    }
}
