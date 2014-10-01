using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class TambolView
    {
        public long Seq { get; set; }

        public string ProvinceCode { get; set; }
        public string AmphurCode { get; set; }

        public string TamCode { get; set; }
        public string TamName { get; set; }
    }
}