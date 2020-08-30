import defaultAxios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  if (!opts.url) {
    return;
  }
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(new Date());
  };
  return { ...state, refetch };
};

export default useAxios;
