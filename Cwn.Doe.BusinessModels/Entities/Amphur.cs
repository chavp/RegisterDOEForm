using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Amphur
        : EntityVersion
    {
        public virtual long Seq { get; protected set; }

        public virtual string ProvinceCode { get; set; }
        public virtual string AmphurCode { get; set; }
        public virtual string AmphurName { get; set; }
        public virtual string ZipCode { get; set; }
    }
}
