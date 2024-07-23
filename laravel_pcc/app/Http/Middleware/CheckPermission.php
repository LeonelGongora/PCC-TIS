namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle($request, Closure $next, $permissionIndex)
    {
        if (!Auth::check() || !$request->user()->hasPermission($permissionIndex)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}