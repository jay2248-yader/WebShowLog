import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLogs } from '../services/logService';

/**
 * Custom hook to fetch and manage log data safely.
 * @param {string} source - Log source URL or path
 * @returns {Object} { logData, loading, error, refetch }
 */
export const useLogData = (source) => {
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep abort controller reference
  const abortControllerRef = useRef(null);

  const loadLogs = useCallback(async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const fetchUrl = source || '/api/out.txt';

      const data = await fetchLogs(fetchUrl, {
        signal: controller.signal,
      });

      setLogData(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was cancelled, do nothing
        return;
      }

      console.error('Error loading logs:', err);
      setError(`ບໍ່ສາມາດໂຫລດຂໍ້ມູນໄດ້: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    loadLogs();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadLogs]);

  return {
    logData,
    loading,
    error,
    refetch: loadLogs,
  };
};
