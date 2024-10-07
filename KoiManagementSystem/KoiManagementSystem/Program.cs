using BusinessLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore; // Thêm using cho EntityFrameworkCore
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RepositoryLayer.Interface;
using RepositoryLayer.Repository;
using ServiceLayer.Interface;
using ServiceLayer.Service;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
// Add services to the container.
// Đăng ký DbContext với chuỗi kết nối từ appsettings.json
builder.Services.AddDbContext<KoiCareContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBDefault")));

// Đăng ký các controller
builder.Services.AddControllers();
builder.Services.AddScoped<IEmailService>(sp =>
          new EmailService(
              smtpHost: "smtp.gmail.com", // Host của dịch vụ SMTP (ví dụ: smtp.gmail.com)
              smtpPort: 587,               // Port của SMTP (thường là 587 hoặc 465)
              fromEmail: "bloomgift.info@gmail.com", // Địa chỉ email người gửi
              smtpUsername: "bloomgift.info@gmail.com",  // Username SMTP
              smtpPassword: "legnvywfdeiurukn"   // Password SMTP
          ));
// Đăng ký Swagger/OpenAPI để dễ dàng kiểm tra API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký các service
builder.Services.AddScoped<IAuthenRepository, AuthenRepository>();
builder.Services.AddScoped<IAuthenService, AuthenService>();

// Cấu hình CORS cho ứng dụng
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // URL của ứng dụng React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Sử dụng Swagger chỉ trong môi trường phát triển
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Sử dụng HTTPS redirection
app.UseHttpsRedirection();
app.UseAuthentication();
// Kích hoạt CORS
app.UseCors("AllowReactApp"); // Đừng quên gọi UseCors

app.UseAuthorization();

// Map các controller
app.MapControllers();

// Chạy ứng dụng
app.Run();
