import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/material.dart';

/// High-fidelity "My Public Memory" button.
///
/// Drop-in widget for the shimmering, breathing memory tag effect.
class PublicMemoryButton extends StatefulWidget {
  const PublicMemoryButton({
    super.key,
    this.label = 'My Public Memory',
    this.onTap,
    this.padding = const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
    this.borderRadius = const BorderRadius.all(Radius.circular(28)),
    this.animate = true,
    this.enableShimmer = true,
    this.enableInnerGlow = true,
    this.shadowIntensity = 1.0,
  });

  final String label;
  final VoidCallback? onTap;
  final EdgeInsets padding;
  final BorderRadius borderRadius;

  /// Turn all animation on/off without changing visual styling.
  final bool animate;

  /// Subtle moving highlight.
  final bool enableShimmer;

  /// Inner glow layers (simulated inset light).
  final bool enableInnerGlow;

  /// 0.0 to 1.5 suggested. Scales shadow and glow strength.
  final double shadowIntensity;

  @override
  State<PublicMemoryButton> createState() => _PublicMemoryButtonState();
}

class _PublicMemoryButtonState extends State<PublicMemoryButton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 3800),
  );

  @override
  void initState() {
    super.initState();
    if (widget.animate) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(covariant PublicMemoryButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.animate != widget.animate) {
      if (widget.animate) {
        _controller.repeat(reverse: true);
      } else {
        _controller.stop();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          final t = widget.animate
              ? Curves.easeInOut.transform(_controller.value)
              : 0.35;

          final intensity = widget.shadowIntensity.clamp(0.0, 1.5);

          return GestureDetector(
            onTap: widget.onTap,
            behavior: HitTestBehavior.translucent,
            child: Stack(
              children: [
                _BaseLayer(
                  label: widget.label,
                  padding: widget.padding,
                  radius: widget.borderRadius,
                  t: t,
                  intensity: intensity,
                ),
                if (widget.enableInnerGlow)
                  Positioned.fill(
                    child: IgnorePointer(
                      child: CustomPaint(
                        painter: _InnerGlowPainter(
                          t: t,
                          radius: widget.borderRadius,
                          intensity: intensity,
                        ),
                      ),
                    ),
                  ),
                if (widget.enableShimmer)
                  Positioned.fill(
                    child: IgnorePointer(
                      child: _ShimmerOverlay(
                        t: t,
                        radius: widget.borderRadius,
                        intensity: intensity,
                      ),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _BaseLayer extends StatelessWidget {
  const _BaseLayer({
    required this.label,
    required this.padding,
    required this.radius,
    required this.t,
    required this.intensity,
  });

  final String label;
  final EdgeInsets padding;
  final BorderRadius radius;
  final double t;
  final double intensity;

  @override
  Widget build(BuildContext context) {
    final outerGlow = 24 + 30 * t;
    final outerGlowOpacity = (0.10 + 0.10 * t) * intensity;

    return Container(
      padding: padding,
      decoration: BoxDecoration(
        borderRadius: radius,
        color: const Color(0x17FFFFFF),
        border: Border.all(color: const Color(0x29FFFFFF)),
        boxShadow: [
          BoxShadow(
            color: Colors.white.withOpacity(outerGlowOpacity),
            blurRadius: outerGlow,
            spreadRadius: 0,
          ),
          BoxShadow(
            color: Colors.white.withOpacity(0.05 * intensity),
            blurRadius: 70 * (0.6 + 0.4 * t),
            spreadRadius: 0,
          ),
          const BoxShadow(
            color: Color(0x99000000),
            blurRadius: 30,
            offset: Offset(0, 14),
            spreadRadius: -8,
          ),
        ],
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Color(0xE6FFFFFF),
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.3,
          shadows: [
            Shadow(color: Color(0x4DFFFFFF), blurRadius: 18),
          ],
        ),
      ),
    );
  }
}

class _InnerGlowPainter extends CustomPainter {
  _InnerGlowPainter({
    required this.t,
    required this.radius,
    required this.intensity,
  });

  final double t;
  final BorderRadius radius;
  final double intensity;

  @override
  void paint(Canvas canvas, Size size) {
    final rrect = radius.toRRect(Offset.zero & size);

    canvas.save();
    canvas.clipRRect(rrect);

    // Top rim light.
    final topPaint = Paint()
      ..color = const Color(0xFFC8D2F0)
          .withOpacity((0.30 + 0.25 * t) * intensity)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, 8 + 6 * t);

    canvas.drawRRect(
      rrect.deflate(-6).shift(const Offset(0, -8)),
      topPaint,
    );

    // Soft inner glow.
    final midPaint = Paint()
      ..color = const Color(0xFFB4BEE6)
          .withOpacity((0.18 + 0.20 * t) * intensity)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, 12 + 8 * t);

    canvas.drawRRect(
      rrect.deflate(-10).shift(const Offset(0, -2)),
      midPaint,
    );

    // Bottom bounce light.
    final bottomPaint = Paint()
      ..color = const Color(0xFF7A82B4)
          .withOpacity((0.14 + 0.12 * t) * intensity)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, 10 + 8 * t);

    canvas.drawRRect(
      rrect.deflate(-8).shift(const Offset(0, 10)),
      bottomPaint,
    );

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _InnerGlowPainter old) {
    return old.t != t || old.intensity != intensity || old.radius != radius;
  }
}

class _ShimmerOverlay extends StatelessWidget {
  const _ShimmerOverlay({
    required this.t,
    required this.radius,
    required this.intensity,
  });

  final double t;
  final BorderRadius radius;
  final double intensity;

  @override
  Widget build(BuildContext context) {
    final x = -0.35 + 0.7 * math.sin(t * math.pi);
    final y = -0.2 + 0.08 * math.cos(t * math.pi);

    return ShaderMask(
      blendMode: BlendMode.screen,
      shaderCallback: (rect) {
        return RadialGradient(
          center: Alignment(x, y),
          radius: 1.2,
          colors: [
            Colors.white.withOpacity((0.28 + 0.18 * t) * intensity),
            Colors.white.withOpacity(0.04 * intensity),
            Colors.transparent,
          ],
          stops: const [0.0, 0.45, 0.72],
        ).createShader(rect);
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: radius,
          color: Colors.white.withOpacity(0.03 * intensity),
        ),
      ),
    );
  }
}

// Optional helper for press feedback.
class PressScale extends StatefulWidget {
  const PressScale({
    super.key,
    required this.child,
    this.onTap,
    this.scale = 0.98,
    this.duration = const Duration(milliseconds: 90),
  });

  final Widget child;
  final VoidCallback? onTap;
  final double scale;
  final Duration duration;

  @override
  State<PressScale> createState() => _PressScaleState();
}

class _PressScaleState extends State<PressScale> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onTapDown: (_) => setState(() => _pressed = true),
      onTapCancel: () => setState(() => _pressed = false),
      onTapUp: (_) => setState(() => _pressed = false),
      behavior: HitTestBehavior.translucent,
      child: AnimatedScale(
        scale: _pressed ? widget.scale : 1.0,
        duration: widget.duration,
        child: widget.child,
      ),
    );
  }
}
