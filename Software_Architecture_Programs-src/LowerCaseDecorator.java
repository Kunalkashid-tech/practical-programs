package Software_Architecture_Programs;

import java.io.ByteArrayInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class LowerCaseDecorator {

    static class LowerCaseInputStream extends FilterInputStream {

        protected LowerCaseInputStream(InputStream in) {
            super(in);
        }

        @Override
        public int read() throws IOException {
            int c = super.read();
            return (c == -1 ? c : Character.toLowerCase((char) c));
        }

        @Override
        public int read(byte[] b, int offset, int len) throws IOException {
            int result = super.read(b, offset, len);
            for (int i = offset; i < offset + result; i++) {
                b[i] = (byte) Character.toLowerCase((char) b[i]);
            }
            return result;
        }
    }

    public static void main(String[] args) {
        String input = "Hello World! THIS is A TeSt.";
        InputStream inputStream = new ByteArrayInputStream(input.getBytes());

        try (InputStream lowerCaseInputStream = new LowerCaseInputStream(inputStream);
             InputStreamReader reader = new InputStreamReader(lowerCaseInputStream)) {

            int c;
            while ((c = reader.read()) != -1) {
                System.out.print((char) c);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
