using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Response
{
    public class ResponseEntity<T>
    {
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public string ErrorMessage { get; set; }

        public ResponseEntity()
        {
        }

        public ResponseEntity(T data)
        {
            IsSuccess = true;
            Data = data;
        }

        public ResponseEntity(string errorMessage)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }
    }
}
