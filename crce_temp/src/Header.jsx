// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaWarehouse, 
  FaBoxOpen, 
  FaChartLine, 
  FaUsers, 
  FaTruck, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Header = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock notifications for demo
  const notifications = [
    { id: 1, text: 'Low stock alert: Printer Paper', time: '10 minutes ago', unread: true },
    { id: 2, text: 'New shipment arrived', time: '2 hours ago', unread: true },
    { id: 3, text: 'Monthly inventory report ready', time: 'Yesterday', unread: false },
  ];

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close other menus if open
    if (!mobileMenuOpen) {
      setNotificationsOpen(false);
      setUserMenuOpen(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setNotificationsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      {/* Main header container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand section */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="bg-blue-600 h-8 w-8 flex items-center justify-center rounded-md mr-2">
                <FaWarehouse className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-800">InventoryPro</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem to="/dashboard" icon={<FaChartLine />} text="Dashboard" active={isActive('/dashboard')} />
            <NavItem to="/inventory" icon={<FaBoxOpen />} text="Inventory" active={isActive('/inventory')} />
            <NavItem to="/suppliers" icon={<FaTruck />} text="Suppliers" active={isActive('/suppliers')} />
            <NavItem to="/users" icon={<FaUsers />} text="Users" active={isActive('/users')} />
            <NavItem to="/settings" icon={<FaCog />} text="Settings" active={isActive('/settings')} />
          </div>

          {/* User section (notifications, profile) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                <FaBell className="h-6 w-6" />
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-4 bg-blue-600 text-white rounded-t-md flex justify-between items-center">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded-full">
                      {notifications.filter(n => n.unread).length} new
                    </span>
                  </div>
                  <div className="py-1 max-h-96 overflow-y-auto" role="menu" aria-orientation="vertical">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${notification.unread ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm text-gray-700">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="py-1 border-t border-gray-100">
                    <Link to="/notifications" className="block px-4 py-2 text-sm text-center text-blue-600 hover:bg-gray-50">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User profile */}
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <FaUserCircle className="h-8 w-8 mr-1 text-gray-500" />
                <span className="text-sm font-medium">{user?.fullName || 'User'}</span>
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Logged in as
                      <p className="font-medium text-gray-700">{user?.username || 'username'}</p>
                      <p className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 mt-1 inline-block">
                        {user?.role || 'role'}
                      </p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <FaUserCircle className="mr-2 text-gray-500" /> Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <FaCog className="mr-2 text-gray-500" /> Settings
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavItem to="/dashboard" icon={<FaChartLine />} text="Dashboard" active={isActive('/dashboard')} />
            <MobileNavItem to="/inventory" icon={<FaBoxOpen />} text="Inventory" active={isActive('/inventory')} />
            <MobileNavItem to="/suppliers" icon={<FaTruck />} text="Suppliers" active={isActive('/suppliers')} />
            <MobileNavItem to="/users" icon={<FaUsers />} text="Users" active={isActive('/users')} />
            <MobileNavItem to="/settings" icon={<FaCog />} text="Settings" active={isActive('/settings')} />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <FaUserCircle className="h-10 w-10 text-gray-500" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.fullName || 'User'}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || 'email@example.com'}</div>
              </div>
              <div className="ml-auto flex items-center space-x-4">
                <button className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none">
                  <FaBell className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link 
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Item Component
const NavItem = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

// Mobile Navigation Item Component
const MobileNavItem = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`block px-4 py-2 text-base font-medium flex items-center ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {text}
  </Link>
);

export default Header;