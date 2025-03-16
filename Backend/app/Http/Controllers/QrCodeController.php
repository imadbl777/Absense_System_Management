<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Log;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeController extends Controller
{
    public function generateQrCodes()
    {
        $students = Student::all();
        $generatedCount = 0;

        foreach ($students as $student) {
            if ($student->qr_code) {
                continue; // Skip if QR code already exists
            }

            try {
                // Generate QR code with additional options for better quality
                $qrCode = QrCode::format('png')
                    ->size(300)  // Increased size for better readability
                    ->margin(1)  // Add a small margin
                    ->generate($student->student_id);
                
                $base64QrCode = base64_encode($qrCode);

                $student->qr_code = $base64QrCode;
                $student->save();

                $generatedCount++;
            } catch (\Exception $e) {
                // Log any errors during QR code generation
                Log::error('QR Code Generation Error for Student ID ' . $student->student_id . ': ' . $e->getMessage());
                
                // Optionally, you might want to continue or break the loop based on your requirements
                continue;
            }
        }

        return response()->json([
            'message' => 'QR codes generated successfully', 
            'total_generated' => $generatedCount
        ], 200);
    }

    public function getQrCode($studentId)
    {
        $student = Student::findOrFail($studentId);

        if (!$student->qr_code) {
            return response()->json(['message' => 'QR code not found'], 404);
        }

        return response()->json(['qr_code' => $student->qr_code], 200);
    }
}