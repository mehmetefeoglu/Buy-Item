import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

// Axios instance oluştur
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

const SignUpPage = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      role_id: "2" // Customer default
    }
  });

  const selectedRole = watch("role_id");

  // Rolleri getir
  useEffect(() => {
    api.get("/roles")
      .then(res => setRoles(res.data))
      .catch(err => setError("Roller yüklenirken hata oluştu."));
  }, []);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      // Form verilerini backend formatına dönüştür
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: parseInt(formData.role_id)
      };

      // Eğer mağaza rolü seçilmişse store bilgilerini ekle
      if (formData.role_id === "3" && formData.store) {
        data.store = {
          name: formData.store.name,
          phone: formData.store.phone,
          tax_no: formData.store.tax_no,
          bank_account: formData.store.bank_account
        };
      }

      await api.post("/signup", data);
      history.goBack();
      alert("You need to click link in email to activate your account!");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                type="text"
                placeholder="Name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("surname", {
                  required: "Surname is required",
                  minLength: {
                    value: 2,
                    message: "Surname must be at least 2 characters"
                  }
                })}
                type="text"
                placeholder="Surname"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message: "Password must contain at least 8 characters, including numbers, lowercase, uppercase and special characters"
                  }
                })}
                type="password"
                placeholder="Password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <select
                {...register("role_id")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                defaultValue="2"
              >
                <option value="2">Customer</option>
                <option value="3">Store</option>
                <option value="1">Admin</option>
              </select>
            </div>

            {/* Store Fields - Only show if store role is selected */}
            {selectedRole === "3" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("store.name", {
                        required: "Store name is required",
                        minLength: {
                          value: 3,
                          message: "Store name must be at least 3 characters"
                        }
                      })}
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.store?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.store.name.message}</p>
                    )}
                  </div>
                </div>

                {/* Store Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Phone
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("store.phone", {
                        required: "Store phone is required",
                        pattern: {
                          value: /^(\+90|0)?[0-9]{10}$/,
                          message: "Invalid phone number"
                        }
                      })}
                      type="tel"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.store?.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.store.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Tax ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tax ID
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("store.tax_no", {
                        required: "Tax ID is required",
                        pattern: {
                          value: /^T\d{3}V\d{6}$/,
                          message: "Invalid Tax ID format (TXXXVXXXXXX)"
                        }
                      })}
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.store?.tax_no && (
                      <p className="mt-1 text-sm text-red-600">{errors.store.tax_no.message}</p>
                    )}
                  </div>
                </div>

                {/* Bank Account */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Account (IBAN)
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("store.bank_account", {
                        required: "IBAN is required",
                        pattern: {
                          value: /^TR\d{2}[0-9A-Z]{5}[0-9A-Z]{17}$/,
                          message: "Invalid IBAN format"
                        }
                      })}
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.store?.bank_account && (
                      <p className="mt-1 text-sm text-red-600">{errors.store.bank_account.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23A6F0] hover:bg-[#1a7ab3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "REGISTER"
                )}
              </button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#23A6F0] hover:text-[#1a7ab3]">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 