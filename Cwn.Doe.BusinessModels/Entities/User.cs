using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class User
        : EntityVersion
    {
        protected User()
        {
            Employers = new List<Employer>();
            CreateBY = Environment.UserName;
        }

        public User(
            string userName, 
            string password,
            string firstName,
            string email) 
            : this()
        {
            UserName = userName;
            SetPassword(password);
            FirstName = firstName;
            Email = email;
        }

        public virtual long Seq { get; protected set; }
        public virtual string UserName { get; protected set; }
        public virtual string Password { get; protected set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual string Tel { get; set; }
        public virtual string Mobile { get; set; }

        public virtual UserType UserType { get; set; }

        public virtual IList<Employer> Employers { get; set; }

        public virtual bool IsLockedOut { get; set; }
        public virtual DateTime LastLoginDate { get; set; }
        public virtual DateTime LastActivityDate { get; set; }
        public virtual DateTime LastPasswordChangedDate { get; set; }
        public virtual DateTime LastLockoutDate { get; set; }
        public virtual string LastLoginIP { get; set; }
        public virtual string LastLockoutIP { get; set; }

        public virtual void SetPassword(string password)
        {
            using (var md5Hash = SHA256.Create())
            {
                string hash = GetSHA256Hash(md5Hash, password);
                Password = hash;
            }
        }

        string GetSHA256Hash(SHA256 sha256Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash. 
            byte[] data = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes 
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string. 
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string. 
            return sBuilder.ToString();
        }

        public virtual bool VerifyPassword(string input)
        {
            using (var md5Hash = SHA256.Create())
            {
                // Hash the input. 
                string hashOfInput = GetSHA256Hash(md5Hash, input);

                // Create a StringComparer an compare the hashes.
                StringComparer comparer = StringComparer.OrdinalIgnoreCase;

                if (0 == comparer.Compare(hashOfInput, Password))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
