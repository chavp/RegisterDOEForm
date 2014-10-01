using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Province
    {
        public virtual long Seq { get; protected set; }
        public virtual string ProvinceCode { get; set; }
        public virtual string ProvinceName { get; set; }
    }
}
