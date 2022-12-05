from django.contrib import admin
from .models import DB,Cities, User, Coordinates

class DBAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class CitiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'region_id', 'name_ar','name_en','center_lat','center_lon')

class UserAdmin(admin.ModelAdmin):
    list_display = ('name',)

class CoordinatesAdmin(admin.ModelAdmin):
    list_display = ('user_id','timestamp','lat','lon')

# Register your models here.
admin.site.register(DB, DBAdmin)
admin.site.register(Cities, CitiesAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Coordinates, CoordinatesAdmin)