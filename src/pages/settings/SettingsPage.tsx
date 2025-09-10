import React, { useState } from 'react';
import {
    User,
    Shield,
    Bell,
    Globe,
    CreditCard,
    Lock,
    Eye,
    EyeOff,
    Save,
    Trash2,
    Download,
    Upload,
    Key,
    Smartphone,
    Mail,
    CheckCircle
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SettingsPage: React.FC = () => {
    const { user } = useAppContext();
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
        promotions: false
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
        { id: 'preferences', label: 'Preferences', icon: Globe }
    ];

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account preferences and security settings</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

                                    {/* User Profile Display */}
                                    <div className="bg-gray-700/30 rounded-xl p-6 mb-6 border border-gray-600">
                                        <div className="flex items-center space-x-4 mb-4">
                                            {user?.profile_picture ? (
                                                <img 
                                                    src={user.profile_picture} 
                                                    alt="Profile" 
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                    <User className="w-8 h-8 text-white" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold text-white">
                                                    {user?.username || 'User'}
                                                </h3>
                                                <p className="text-gray-400">
                                                    {user?.first_name} {user?.last_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    User ID: {user?.user_id}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-300">Email:</span>
                                                <span className="text-white">{user?.email || 'Not provided'}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Smartphone className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-300">Phone:</span>
                                                <span className="text-white">{user?.phone_number || 'Not provided'}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-300">Type:</span>
                                                <span className="text-white">{user?.type || 'PLAYER'}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Key className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-300">Referral Code:</span>
                                                <span className="text-white">{user?.referral_code || 'Not available'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user?.first_name || ''}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user?.last_name || ''}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={user?.email || ''}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                defaultValue={user?.phone_number || ''}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                                            <Save className="w-4 h-4" />
                                            <span>Save Changes</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 pr-10"
                                                />
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 pr-10"
                                                />
                                                <button
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                                            <Key className="w-4 h-4" />
                                            <span>Update Password</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>

                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                                <div>
                                                    <h3 className="text-white font-medium capitalize">{key} Notifications</h3>
                                                    <p className="text-gray-400 text-sm">Receive notifications via {key}</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                                                    className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-yellow-500' : 'bg-gray-600'
                                                        }`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                        }`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Payment Methods Tab */}
                            {activeTab === 'payment' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <CreditCard className="w-6 h-6 text-blue-400" />
                                                    <div>
                                                        <h3 className="text-white font-medium">Visa ending in 1234</h3>
                                                        <p className="text-gray-400 text-sm">Expires 12/25</p>
                                                    </div>
                                                </div>
                                                <button className="text-red-400 hover:text-red-300">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <button className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Upload className="w-4 h-4" />
                                                <span>Add New Payment Method</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                            <div>
                                                <h3 className="text-white font-medium">Dark Mode</h3>
                                                <p className="text-gray-400 text-sm">Use dark theme</p>
                                            </div>
                                            <div className="w-12 h-6 bg-yellow-500 rounded-full">
                                                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                            <div>
                                                <h3 className="text-white font-medium">Language</h3>
                                                <p className="text-gray-400 text-sm">English (US)</p>
                                            </div>
                                            <select className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm">
                                                <option>English (US)</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;