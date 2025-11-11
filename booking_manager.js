const BookingManager = {
    viewAllBookings: function() {
        const bookings = BookingAuth.getSavedBookings();
        
        if (bookings.length === 0) {
            console.log('📭 No bookings found');
            return;
        }
        
        console.group('📋 All Bookings');
        console.table(bookings);
        console.groupEnd();
        
        return bookings;
    },
    
    viewBookingsByPhone: function(phone) {
        const bookings = BookingAuth.getSavedBookings();
        const filtered = bookings.filter(b => b.phone === phone);
        
        if (filtered.length === 0) {
            console.log(`📭 No bookings found for ${phone}`);
            return [];
        }
        
        console.group(`📋 Bookings for ${phone}`);
        console.table(filtered);
        console.groupEnd();
        
        return filtered;
    },
    
    getStatistics: function() {
        const bookings = BookingAuth.getSavedBookings();
        const attempts = JSON.parse(localStorage.getItem('bookingAttempts')) || [];
        
        const stats = {
            totalBookings: bookings.length,
            totalAuthAttempts: attempts.length,
            recentBookings: bookings.slice(-5),
            pendingBookings: bookings.filter(b => b.status === 'pending').length,
            uniquePhones: new Set(bookings.map(b => b.phone)).size
        };
        
        console.group('📊 Booking Statistics');
        console.log('Total Bookings:', stats.totalBookings);
        console.log('Auth Attempts:', stats.totalAuthAttempts);
        console.log('Pending Bookings:', stats.pendingBookings);
        console.log('Unique Users:', stats.uniquePhones);
        console.table(stats.recentBookings);
        console.groupEnd();
        
        return stats;
    },
    
    exportAsJSON: function() {
        const bookings = BookingAuth.getSavedBookings();
        const json = JSON.stringify(bookings, null, 2);
        
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        console.log('✅ Bookings exported as JSON');
    },
    
    exportAsCSV: function() {
        const bookings = BookingAuth.getSavedBookings();
        
        if (bookings.length === 0) {
            console.log('📭 No bookings to export');
            return;
        }
        
        const keys = Array.from(new Set(bookings.flatMap(Object.keys)));
        
        const csv = [keys.join(',')];
        
        bookings.forEach(booking => {
            const row = keys.map(key => {
                const value = booking[key];
                // Escape quotes and wrap in quotes if contains comma
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value || '';
            });
            csv.push(row.join(','));
        });
        
        const csvText = csv.join('\n');
        const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        console.log('✅ Bookings exported as CSV');
    },
    
    clearAllBookings: function() {
        if (!confirm('⚠️ Are you sure you want to delete ALL bookings? This cannot be undone.')) {
            return false;
        }
        
        localStorage.removeItem('savedBookings');
        console.log('🗑️ All bookings cleared');
        return true;
    },
    
    deleteBooking: function(bookingId) {
        const bookings = BookingAuth.getSavedBookings();
        const filtered = bookings.filter(b => b.id !== bookingId);
        
        if (filtered.length === bookings.length) {
            console.log('❌ Booking not found:', bookingId);
            return false;
        }
        
        localStorage.setItem('savedBookings', JSON.stringify(filtered));
        console.log('✅ Booking deleted:', bookingId);
        return true;
    },
    
    viewAuthAttempts: function() {
        const attempts = JSON.parse(localStorage.getItem('bookingAttempts')) || [];
        
        if (attempts.length === 0) {
            console.log('📭 No auth attempts found');
            return [];
        }
        
        console.group('🔐 Authorization Attempts');
        console.table(attempts);
        console.groupEnd();
        
        return attempts;
    },
    
    getSessionInfo: function() {
        const isAuthorized = BookingAuth.isAuthorized();
        const userPhone = BookingAuth.getUserPhone();
        const isExpired = BookingAuth.isSessionExpired();
        const sessionTime = localStorage.getItem(BookingAuth.SESSION_KEY);
        
        const info = {
            'Authorized': isAuthorized ? '✅ Yes' : '❌ No',
            'User Phone': userPhone || 'N/A',
            'Session Expired': isExpired ? '❌ Yes' : '✅ No',
            'Session Started': sessionTime ? new Date(parseInt(sessionTime)).toLocaleString() : 'N/A',
            'Session Duration': BookingAuth.AUTH_TIMEOUT / 60000 + ' minutes'
        };
        
        console.group('📊 Current Session');
        console.table(info);
        console.groupEnd();
        
        return info;
    },
    
    clearAllData: function() {
        if (!confirm('⚠️ This will clear ALL booking data! Continue?')) {
            return false;
        }
        
        localStorage.removeItem('barberShop_auth');
        localStorage.removeItem('barberShop_session');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('savedBookings');
        localStorage.removeItem('bookingAttempts');
        
        console.log('🗑️ All data cleared');
        window.location.reload();
        return true;
    },
    
    createDemoBooking: function() {
        if (!BookingAuth.isAuthorized()) {
            BookingAuth.authorize('+1-555-123-4567');
        }
        
        const demoBooking = {
            date: '2025-12-20',
            time: '14:00',
            service: 'haircut',
            barber: 'alexander',
            name: 'John Doe',
            phone: '+1-555-123-4567',
            email: 'john@example.com',
            notes: 'Demo booking - test data'
        };
        
        BookingAuth.saveBookingData(demoBooking);
        console.log('✅ Demo booking created:', demoBooking);
    }
};

window.BookingManager = BookingManager;

console.log('✅ booking_manager.js loaded successfully');
console.log('📝 Available commands:');
console.log('  - BookingManager.viewAllBookings()');
console.log('  - BookingManager.viewBookingsByPhone(phone)');
console.log('  - BookingManager.getStatistics()');
console.log('  - BookingManager.getSessionInfo()');
console.log('  - BookingManager.exportAsJSON()');
console.log('  - BookingManager.exportAsCSV()');
console.log('  - BookingManager.viewAuthAttempts()');
console.log('  - BookingManager.clearAllBookings()');
console.log('  - BookingManager.clearAllData()');
console.log('  - BookingManager.createDemoBooking()');
