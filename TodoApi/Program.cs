using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ToDoDBContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
        new MySqlServerVersion(new Version(8, 0, 44))));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();  

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "Hello World!");
app.MapGet("/items", async (ToDoDBContext db) =>
    await db.Items.ToListAsync());

app.MapPost("/items", async (ToDoDBContext db, Item item) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});

app.MapPut("/items/{id}", async (ToDoDBContext db, int id, Item inputItem) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = inputItem.Name;
    item.IsComplete = inputItem.IsComplete;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/items/{id}", async (ToDoDBContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok();
});
app.UseCors("AllowReactApp");
app.Run();
