'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Photo {
  id: string;
  originalName: string;
  description: string;
  createdAt: string;
}

interface Report {
  id: string;
  title: string;
  date: string;
  status: string;
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [photosRes, reportsRes] = await Promise.all([
        fetch('/api/photos'),
        fetch('/api/reports')
      ]);

      if (photosRes.ok) {
        const photosData = await photosRes.json();
        setPhotos(photosData);
      }

      if (reportsRes.ok) {
        const reportsData = await reportsRes.json();
        setReports(reportsData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">台灣家庭月報</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">歡迎，{user.user_metadata?.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photos Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">我的照片</h3>
                  <Link
                    href="/upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    上傳照片
                  </Link>
                </div>
                {loadingData ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : photos.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">還沒有上傳任何照片</p>
                ) : (
                  <div className="space-y-3">
                    {photos.slice(0, 5).map((photo) => (
                      <div key={photo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{photo.originalName}</p>
                          {photo.description && (
                            <p className="text-sm text-gray-500">{photo.description}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(photo.createdAt).toLocaleDateString('zh-TW')}
                        </span>
                      </div>
                    ))}
                    {photos.length > 5 && (
                      <p className="text-center text-sm text-gray-500">
                        還有 {photos.length - 5} 張照片...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Reports Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">我的月報</h3>
                  <Link
                    href="/create-report"
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    建立月報
                  </Link>
                </div>
                {loadingData ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                ) : reports.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">還沒有建立任何月報</p>
                ) : (
                  <div className="space-y-3">
                    {reports.slice(0, 5).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{report.title}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            report.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                            report.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status === 'PUBLISHED' ? '已發布' :
                             report.status === 'DRAFT' ? '草稿' : '已封存'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(report.date).toLocaleDateString('zh-TW')}
                        </span>
                      </div>
                    ))}
                    {reports.length > 5 && (
                      <p className="text-center text-sm text-gray-500">
                        還有 {reports.length - 5} 份月報...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 