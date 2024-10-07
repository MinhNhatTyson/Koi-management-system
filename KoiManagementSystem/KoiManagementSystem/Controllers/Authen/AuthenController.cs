using BusinessLayer.Request;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;
using ServiceLayer.Service;

namespace KoiManagementSystem.Controllers.Authen
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenController : Controller
    {
        private readonly IAuthenService _authenService;

        public AuthenController(IAuthenService authenService)
        {
            _authenService = authenService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody]  BusinessLayer.Request.RegisterRequest registerRequest) {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _authenService.Register(registerRequest);

                return Ok(new { message = "Đăng ký thành công", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] BusinessLayer.Request.LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.PasswordHash))
            {
                return BadRequest("Email or password cannot be empty.");
            }

            try
            {
                var token = await _authenService.Login(loginRequest);
                if (token == null)
                {
                    return Unauthorized("Tài khoạn không xác thực.");
                }
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
