sed -i -e '/{/* Notifications */}/,+4c \
        {/* Notifications */}\
        <Link to="/admin/notifications" className="p-2 rounded-full hover:bg-black/5 transition-colors relative">\
          <FiBell className="text-xl" />\
          {unreadCount > 0 && (\
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full border border-white text-[10px] flex items-center justify-center font-bold">\
              {unreadCount > 9 ? "9+" : unreadCount}\
            </span>\
          )}\
        </Link>' src/admin/components/Topbar.jsx
