using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Showcase_Shenanigans_api.Migrations
{
    /// <inheritdoc />
    public partial class AddMovieActiveState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Movies",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Movies");
        }
    }
}
