using BusinessLayer;
using KoiManagementSystem.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;
using RepositoryLayer.Interface;
using RepositoryLayer.Repository;
using ServiceLayer.Interface;
using ServiceLayer.Service;
using System.Text;
using KoiManagementSystem.Controllers.Product.Cart;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Newtonsoft.Json;
using KoiManagementSystem;
using KoiManagementSystem.Controllers.Product.Order;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("default.json", optional: true, reloadOnChange: true);


// Cấu hình Authentication

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

// Đăng ký DbContext
builder.Services.AddDbContext<KoiCareContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBDefault")));

// Đăng ký các dịch vụ
builder.Services.AddScoped<IEmailService>(sp =>
    new EmailService(
        smtpHost: "smtp.gmail.com",
        smtpPort: 587,
        fromEmail: "bloomgift.info@gmail.com",
        smtpUsername: "bloomgift.info@gmail.com",
        smtpPassword: "legnvywfdeiurukn"
    ));
builder.Services.AddControllersWithViews()
        .AddSessionStateTempDataProvider();
// Đăng ký Distributed Memory Cache cho Session
builder.Services.AddDistributedMemoryCache(); // Thêm dòng này
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Đăng ký Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký các dịch vụ khác
builder.Services.AddScoped<IAuthenRepository, AuthenRepository>();
builder.Services.AddScoped<IAuthenService, AuthenService>();
builder.Services.AddScoped<IKoiFishService, KoiFishService>();
builder.Services.AddScoped<IKoiGrowthService, KoiGrowthService>();
builder.Services.AddScoped<IFeedScheduleService, FeedScheduleService>();
builder.Services.AddScoped<IPondService, PondService>();


builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddScoped<IVnPayRepo, VnPayRepo>();

//Dang ky DI

builder.Services.AddTransient<IKoiFishRepository, KoiFishRepository>();
builder.Services.AddTransient<IKoiGrowthRepository, KoiGrowthRepository>();
builder.Services.AddTransient<IFeedScheduleRepository, FeedScheduleRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<ICartSerivce, CartService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddTransient<IPondRepo, PondRepo>();


// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Fill data
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetService<KoiCareContext>();
        var dataGenerator = new DataGenerator(context);
        dataGenerator.PopulateDatabase(context);
    }
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseRouting();
app.UseCors("AllowReactApp"); // Hoặc "AllowAll"
app.UseSession(); // Đặt sau UseRouting và trước UseAuthorization
app.UseAuthorization();

// Map các controller
app.MapControllers();

// Chạy ứng dụng
app.Run();
