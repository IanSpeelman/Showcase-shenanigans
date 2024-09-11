using Microsoft.AspNetCore.Identity;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Showcase_Shenanigans_api.Data;

namespace Showcase_Shenanigans_api.Services
{
  public class Validator
  {
    private readonly PasswordHasher<object> _passwordHasher;
    public string HashedPassword { get; set; }
    public string ProvidedPassword { get; set; }

    public Validator(string HashedPassword, string ProvidedPassword)
    {
      this._passwordHasher = new PasswordHasher<object>();
      this.HashedPassword = HashedPassword;
      this.ProvidedPassword = ProvidedPassword;
    }

    public bool validate()
    {
      var result = _passwordHasher.VerifyHashedPassword(null, HashedPassword, ProvidedPassword);
      return result == PasswordVerificationResult.Success;
    }


  }


  public class JwtTokenGenerator
  {
    private readonly JwtSettings _jwtSettings;
    private readonly IConfiguration _configuration;

    // Constructor accepting IConfiguration as a parameter
    public JwtTokenGenerator(IConfiguration configuration)
    {
      _configuration = configuration;

      // Retrieve JWT settings from the configuration
      _jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();
    }

    public string GenerateToken(User User)
    {
      var claims = new[]
      {
            new Claim(JwtRegisteredClaimNames.Sub, User.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, User.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("role", User.Role),
            new Claim("FirstName", User.FirstName),
            new Claim("LastName", User.LastName),
        };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: _jwtSettings.Issuer,
          audience: _jwtSettings.Audience,
          claims: claims,
          expires: DateTime.Now.AddMinutes(_jwtSettings.ExpiryMinutes),
          signingCredentials: creds);

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }




}
