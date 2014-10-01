using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class PreRegisterSurvey
        : EntityVersion
    {
        public virtual long Seq { get; protected set; }

        protected PreRegisterSurvey()
        {
            CreateDate = DateTime.Now;
        }

        public PreRegisterSurvey(WPPreRegister preRegister, Units units)
            : this()
        {
            PreRegister = preRegister;
            Units = units;
        }

        public virtual WPPreRegister PreRegister { get; protected set; }
        public virtual Units Units { get; protected set; }

        public virtual string NameContract { get; set; }
        public virtual string Tel { get; set; }

        
    }
}
