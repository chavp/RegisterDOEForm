using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class UserType
        : EntityVersion
    {
        public virtual int ID { get; set; }
        public virtual string Name { get; set; }
        public virtual string NameEN { get; set; }
    }
}
